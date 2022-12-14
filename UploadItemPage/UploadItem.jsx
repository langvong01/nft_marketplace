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
import axiosClient from '../utils/axiosClient';
import BackDrop from '@/components/BackDrop/BackDrop';

import Link from 'next/link';
import Web3Modal from 'web3modal';
import { nftContractAbi, NFT } from '../contractsABI.json';
import { ethers } from 'ethers';
import SnackBarSuccess from '@/components/SnackBarSucces/snackbar-succes';

const UploadItem = () => {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [collectionUI, setcollectionUI] = useState(null);
  const [image, setImage] = useState(null);
  const [openBackDrop, setOpenBackDrop] = useState(false);

  const [collectionID, setCollectionID] = useState(null);
  const [fetchCollection, setFetchCollection] = useState(null);
  const [toast, setToast] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    message: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
  });

  const onSubmit = async (data) => {
    if (!image || !collectionUI) {
      setToast({
        ...toast,
        open: true,
        message: 'Please select the image or collection',
      });
      return;
    }

    const { itemName, description } = data;
    let itemId = 0;
    try {
      setOpenBackDrop(true);
      const formData = new FormData();
      formData.append('itemName', itemName.trim());
      formData.append('description', description);
      formData.append('collectionId', collectionID);
      formData.append('mediaFile', image);
      const respone = await axiosClient.post(`/item`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      //open error messgage
      if (respone.data.status === 400) {
        setToast({ ...toast, open: true, message: respone.data.error });
      }

      itemId = respone.data.body.itemId;
      const metaDataURI = respone.data.body.metaDataFileUrl;
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      //open backdrop
      let contract = new ethers.Contract(NFT, nftContractAbi, signer);
      let transaction = await contract.createToken(metaDataURI);
      let tx = await transaction.wait();
      let event = tx.events[0];
      let value = event.args[2];
      let tokenId = value.toNumber();
      let transactionHash = tx.transactionHash;
      const r = await axiosClient.post(
        `/item/set-minted`,
        {
          tokenId: tokenId,
          itemId: itemId,
          txnHashLink: 'https://mumbai.polygonscan.com/tx/' + transactionHash,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      setOpenBackDrop(false);
      router.push(`/NFT-details/${itemId}`);
    } catch (error) {
      setOpenBackDrop(false);
      if (itemId) {
        await axiosClient.delete('/item/delete/' + itemId);
      }
    }
  };

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
        <div className={Style.upload_box}>
          <div className={Style.upload_box_left}>
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
          </div>
          <div className={Style.upload_box_right}>
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
          </div>
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Choose collection</label>
          <p className={Style.upload_box_input_para}>
            Choose an exiting collection or
            <Link href="/uploadNFT">
              <a className="text-primary ml-1">create a new one</a>
            </Link>
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
                <p className="mt-3 fs-6 text-capitalize">{el.collectionName}</p>
              </div>
              
            ))}
          </div>
        </div>
        <div className={Style.upload_box_btn}>
          <Button
            type='submit'
            btnName="Upload"
            handleClick={() => handleSubmit(onSubmit)}
            classStyle={`${Style.upload_box_btn_style} w-50`}
          />
        </div>
      </div>
      <BackDrop openBackDrop={openBackDrop} />
      <SnackBarSuccess
        open={toast.open}
        horizontal={toast.horizontal}
        vertical={toast.vertical}
        setToast={setToast}
        message={toast.message}
        type="error"
      />
    </form>
  );
};

export default UploadItem;
