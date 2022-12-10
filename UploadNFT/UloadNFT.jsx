import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
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

const BASE_API = 'http://localhost:8080/api/v1';

const UloadNFT = () => {
  const [categories, setCategory] = useState();
  const [featuredImage, setFeaturedImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const handleChange = (event) => {
    setValue('categoryId', event.target.value);
  };

  const connectCreateCollectService = async (data) => {
    if (!featuredImage || !logoImage || !bannerImage) {
      alert('Please upload all images and try again.');
      return;
    }

    const { name, description, categoryId } = data;
    console.log(data);

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
      console.log('response: ', response);
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
                register={register}
                label="featuredImage"
                setImage={setFeaturedImage}
              />
              <DropZone
                title="Drag & drop logoImage here"
                heading="or Browse media on your device"
                image={images.upload}
                register={register}
                label="logoImage"
                setImage={setLogoImage}
              />
              <DropZone
                title="Drag & drop file bannerImage"
                heading="or Browse media on your device"
                image={images.upload}
                register={register}
                label="bannerImage"
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
                  <FormControl error={!!errors.categoryId} className="w-1/3">
                    <InputLabel>Category</InputLabel>
                    <Select
                      label="Category"
                      onChange={handleChange}
                      value={getValues('categoryId')}
                      defaultValue={categories?.[0].categoryId}
                    >
                      {categories?.map((item) => (
                        <MenuItem value={item.categoryId}>
                          {item.categoryName}
                        </MenuItem>
                      ))}
                    </Select>
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
    </div>

    // <div clasName='format lg:format-lg'>
    //   <div className='container mx-auto my-12 mt-4'>
    //     <h2 className='text-4xl text-center my-8 font-bold gap-5'>Create collections</h2>
    //     <Box className='flex justify-center items-center gap-5'>
    //       <TextField id="outlined-basic" label="name" variant="outlined" className='w-1/3' error={!!errors.name} {...register('name', { required: true })} />
    //     </Box>
    //     <Box className='flex justify-center items-center gap-5'>
    //       {errors.name && <span>Can not be empty!</span>}
    //     </Box>
    //     <Box className='flex justify-center items-center gap-5 mt-3.5'>
    //       <TextField id="outlined-basic" type="file" variant="outlined" className='w-1/3' error={!!errors.featuredImage}  {...register('featuredImage', { required: true })} />
    //     </Box>
    //     <Box className='flex justify-center items-center gap-5'>
    //       {errors.featuredImage && <span>Can not be empty!</span>}
    //     </Box>
    //     <Box className='flex justify-center items-center gap-5 mt-3.5'>
    //       <TextField id="outlined-basic" type="file" variant="outlined" className='w-1/3' error={!!errors.logoImage}  {...register('logoImage', { required: true })} />
    //     </Box>
    //     <Box className='flex justify-center items-center gap-5'>
    //       {errors.logoImage && <span>Can not be empty!</span>}
    //     </Box>
    //     <Box className='flex justify-center items-center gap-5 mt-3.5'>
    //       <TextField id="outlined-basic" type="file" variant="outlined" className='w-1/3' error={!!errors.bannerImage}  {...register('bannerImage', { required: true })} />
    //     </Box>
    //     <Box className='flex justify-center items-center gap-5'>
    //       {errors.bannerImage && <span>Can not be empty!</span>}
    //     </Box>
    //     <Box className='flex justify-center items-center gap-5 mt-3.5'>
    //       <TextField id="outlined-basic" label="description" variant="outlined" className='w-1/3' error={!!errors.description}  {...register('description', { required: true })} />
    //     </Box>
    //     <Box className='flex justify-center items-center gap-5'>
    //       {errors.description && <span>Can not be empty!</span>}
    //     </Box>
    //     {/* <Box className='flex justify-center items-center gap-5 mt-3.5'>
    //       <TextField id="outlined-basic" label="categoryId" variant="outlined" className='w-1/3' error={!!errors.categoryId}  {...register('categoryId', { required: true })} />
    //     </Box>
    //     <Box className='flex justify-center items-center gap-5'>
    //       {errors.categoryId && <span>Can not be empty!</span>}
    //     </Box> */}

    //     <Box className='flex justify-center'> <Button onClick={handleSubmit(connectCreateCollectService)} className="text-white mt-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-10 py-3 text-center mr-2 mb-2">submit</Button></Box>
    //   </div>
    // </div>
  );
};

export default UloadNFT;
