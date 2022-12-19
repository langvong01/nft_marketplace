import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import images from '../img';
import Input from '../CreateNftItem/FormControll/input';
import TextArea from '../CreateNftItem/FormControll/TextArea/TextArea';
import axiosClient from '../utils/axiosClient';
import { DropZone } from '../UploadItemPage/uploadItemIndex';
import Button from '../components/Button/Button';

import Style from '../styles/upload-nft.module.css';
import btnStyle from './Upload.module.css';
import BackDrop from '@/components/BackDrop/BackDrop';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { connectMetaMaskState } from 'global-state/connect-metamask';

const BASE_API = 'http://localhost:8080/api/v1';

const UloadNFT = () => {
  const [categories, setCategory] = useState();
  const [featuredImage, setFeaturedImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [recoilState, setRecoilState] = useRecoilState(connectMetaMaskState);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({});
  const handleChange = (event) => {
    setValue('categoryId', event.target.value);
  };

  const connectCreateCollectService = async (data) => {
    if (!featuredImage || !logoImage || !bannerImage) {
      alert('Please upload all images and try again.');
      return;
    }
    setOpenBackDrop(true);
    const { name, description, categoryId } = data;

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('bannerImage', bannerImage);
      formData.append('featuredImage', featuredImage);
      formData.append('logoImage', logoImage);
      formData.append('description', description);
      formData.append('categoryId', categoryId);

      const response = await axiosClient.post(`/collection`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setOpenBackDrop(false);
      router.push(`/account/${recoilState.accountCurrent}`);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const data = await (await fetch(`${BASE_API}/category`)).json();
      setCategory(data.body);
    } catch (error) {}
  };

  return (
    <div className={Style.uploadNFT}>
      <div className={Style.uploadNFT_box}>
        <div className={Style.uploadNFT_box_heading}>
          <h1>Create New Collection</h1>
        </div>

        <div className={Style.uploadNFT_box_title}>
          <h2>Image, Video, Audio, or 3D Model</h2>
          <p>
            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
            GLB, GLTF. Max size: 100 MB
          </p>
        </div>

        <div className={Style.uploadNFT_box_form}>
          {/* //create collection form */}
          <div className={Style.upload}>
            <form onSubmit={handleSubmit(connectCreateCollectService)}>
              <DropZone
                title="Drag & drop featuredImage here"
                heading="or Browse media on your device"
                image={images.upload}
                setImage={setFeaturedImage}
              />
              <DropZone
                title="Drag & drop logoImage here"
                heading="or Browse media on your device"
                image={images.upload}
                setImage={setLogoImage}
              />
              <DropZone
                title="Drag & drop file bannerImage"
                heading="or Browse media on your device"
                image={images.upload}
                setImage={setBannerImage}
              />
              <div className={Style.upload_box}>
                <Input
                  label="name"
                  placeholder="Your collection name"
                  register={register}
                  type="text"
                  errors={errors}
                />
                <TextArea
                  label="description"
                  placeholder="Something about your collection"
                  register={register}
                  errors={errors}
                />

                {/* Select Box */}
                <Box className="flex  items-center gap-5 mt-3.5">
                  <FormControl
                    required
                    error={!!errors.categoryId}
                    className="w-1/3"
                  >
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="categoryId"
                      id="categoryId"
                      label="Category *"
                      onChange={handleChange}
                      // value={getValues('categoryId')}
                      value={categories?.[0].categoryId || ''}
                    >
                      {categories?.map((item) => (
                        <MenuItem value={item.categoryId}>
                          {item.categoryName}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.categoryId && (
                      <FormHelperText error> Choose a category</FormHelperText>
                    )}
                  </FormControl>
                </Box>

                <div className={btnStyle.upload_box_btn}>
                  <Button
                    btnName="Upload"
                    handleClick={() =>
                      handleSubmit(connectCreateCollectService)
                    }
                    classStyle={btnStyle.upload_box_btn_style}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <BackDrop openBackDrop={openBackDrop} />
    </div>
  );
};

export default UloadNFT;
