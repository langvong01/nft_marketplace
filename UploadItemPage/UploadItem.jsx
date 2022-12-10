import React, { useEffect, useState } from 'react';
import { TiTick } from 'react-icons/ti';
import Image from 'next/image';
import { useRouter } from 'next/router';

//INTERNAL IMPORT
import Style from '../UploadItemPage/UploadItem.module.css';
import formStyle from '../AccountPage/Form/Form.module.css';
import images from '../img';
import Button from '../components/Button/Button';
import { DropZone } from '../UploadItemPage/uploadItemIndex';
import { useForm } from 'react-hook-form';
import Input from '../CreateNftItem/FormControll/input';
import TextArea from '../CreateNftItem/FormControll/TextArea/TextArea';
import InputWithIcon from '../CreateNftItem/FormControll/InputWithIcon/inputIcon';
import axiosClient from '../utils/axiosClient';
import collection from 'pages/collection';
import Web3Modal from 'web3modal';
import {nftContractAbi, marketContractAbi, NFT, Market } from '../contractsABI.json';
import {ethers } from 'ethers';

const UploadItem = () => {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [collectionUI, setcollectionUI] = useState(null);
  const [image, setImage] = useState(null);

  const [collectionID, setCollectionID] = useState(null);
  const [fetchCollection, setFetchCollection] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
  });

  const onSubmit = async (data) => {
    if (!image || !collectionUI) {
      alert('Please upload image and choose collection');
      return;
    }

    const { itemName,description } = data;
    let itemId = 0;
    try {
      const formData = new FormData();
      formData.append('itemName', itemName);
      formData.append('description', description);
      formData.append('collectionId', collectionID);
      formData.append('mediaFile', image);
      const respone = await axiosClient.post(`/item`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      itemId = respone.data.body.itemId;
      const metaDataURI = respone.data.body.metaDataFileUrl;
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(NFT, nftContractAbi, signer);
      let transaction = await contract.createToken(metaDataURI);
      let tx = await transaction.wait()
      let event = tx.events[0]
      let value = event.args[2]
      let tokenId = value.toNumber();
      let transactionHash = tx.transactionHash;
      const r = await axiosClient.post(`/item/set-minted`, {
        tokenId : tokenId,
        itemId : itemId,
        txnHashLink : "https://mumbai.polygonscan.com/tx/" + transactionHash
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(tokenId);

      router.push("/NFT-details")
    } catch (error) {
      console.log(error);
      if(itemId) {
        await axiosClient.delete('/item/' + itemId);
      }
    }
  };

  // const categoryArry = [
  //   {
  //     id: 1,
  //     image: images.nft_image_1,
  //     category: "Sports",
  //   },
  //   {
  //     id: 2,
  //     image: images.nft_image_2,
  //     category: "Arts",
  //   },
  //   {
  //     id: 3,
  //     image: images.nft_image_3,
  //     category: "Music",
  //   },
  //   {
  //     id: 4,
  //     image: images.nft_image_1,
  //     category: "Digital",
  //   },
  //   {
  //     id: 5,
  //     image: images.nft_image_2,
  //     category: "Time",
  //   },
  //   {
  //     id: 6,
  //     image: images.nft_image_3,
  //     category: "Photography",
  //   },
  // ];

  const getAllCollections = async () => {
    try {
      const respone = await axiosClient.get(`/collection/personal`);
      const { body: data } = respone.data;
      console.log(data);
      setFetchCollection(data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllCollections();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={Style.upload}>
        <DropZone
          title="JPG, PNG, WEBM , MAX 100MB"
          heading="Drag & drop file"
          subHeading="or Browse media on your device"
          collection={collectionUI}
          image={images.upload}
          register={register}
          label="Item Image"
          errors={errors}
          setImage={setImage}
        />
        <div className={Style.upload_box}>
          <Input
            label="itemName"
            placeholder="Treasure"
            register={register}
            type="text"
            errors={errors}
          />
          <TextArea
            label="description"
            placeholder="Something about your NFt"
            register={register}
            errors={errors}
          />

          <div className={formStyle.Form_box_input}>
            <label htmlFor="name">Choose collection</label>
            <p className={Style.upload_box_input_para}>
              Choose an exiting collection or create a new one
            </p>

            <div className={Style.upload_box_slider_div}>
              {fetchCollection?.map((el, i) => (
                <div
                  className={`${Style.upload_box_slider} ${
                    active == i + 1 ? Style.active : ''
                  }`}
                  key={i + 1}
                  onClick={() => (
                    setActive(i + 1),
                    setcollectionUI(el.collectionName),
                    setCollectionID(el.collectionId)
                  )}
                >
                  <div className={Style.upload_box_slider_box}>
                    <div className={Style.upload_box_slider_box_img}>
                      <Image
                        loader={() => el.logoImage}
                        width={50}
                        height={50}
                        src={el.logoImage}
                        alt={el.collectionName}
                        className={Style.upload_box_slider_box_img_img}
                      />
                    </div>
                    <div className={Style.upload_box_slider_box_img_icon}>
                      <TiTick />
                    </div>
                  </div>
                  <p className="mt-3 fs-6 text-capitalize">
                    {el.collectionName}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={Style.upload_box_btn}>
            <Button
              btnName="Upload"
              handleClick={() => handleSubmit(onSubmit)}
              classStyle={Style.upload_box_btn_style}
            />
            <Button
              btnName="Preview"
              handleClick={() => {}}
              classStyle={Style.upload_box_btn_style}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default UploadItem;
