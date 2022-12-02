import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import axiosClient from '../../../utils/axiosClient';


const BASE_API = 'http://localhost:8080/api/v1'

const CreateCollectionV1 = () => {
  const [categories, setCategory] = useState()

  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
  const handleChange = (event) => {
    setValue('category', event.target.value);
  };

  useEffect(() => {
    register('category', { required: true })
  }, [])

  const connectCreateCollectService = async (data) => {
    const { name, bannerImage, featuredImage, logoImage, description, categoryId } = data
    console.log(data)

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('bannerImage', bannerImage[0])
      formData.append('featuredImage', featuredImage[0])
      formData.append('logoImage', logoImage[0])
      formData.append('description', description)
      formData.append('categoryId', categoryId)



      const response = await axiosClient.post(`/collection`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      // const response = await fetch(`${BASE_API}/collection`, {
      //   headers: { "Content-Type": "multipart/form-data" },
      //   method: "POST",
      //   body: formData,
      //   withCredentials: true
      // })
      console.log("response: ", response);
    } catch (error) {
      console.log("error: ", error);
    }

  }

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    try {
      const data = await (await fetch(`${BASE_API}/category`)).json()
      setCategory(data.body)
    } catch (error) {

    }
  }

  console.log(data);
  return (

    <div clasName='format lg:format-lg'>
      <div className='container mx-auto my-12 mt-4'>
        <h2 className='text-4xl text-center my-8 font-bold gap-5'>Create collections</h2>
        <Box className='flex justify-center items-center gap-5'>
          <TextField id="outlined-basic" label="name" variant="outlined" className='w-1/3' error={!!errors.name} {...register('name', { required: true })} />
        </Box>
        <Box className='flex justify-center items-center gap-5'>
          {errors.name && <span>Can not be empty!</span>}
        </Box>
        <Box className='flex justify-center items-center gap-5 mt-3.5'>
          <TextField id="outlined-basic" type="file" variant="outlined" className='w-1/3' error={!!errors.featuredImage}  {...register('featuredImage', { required: true })} />
        </Box>
        <Box className='flex justify-center items-center gap-5'>
          {errors.featuredImage && <span>Can not be empty!</span>}
        </Box>
        <Box className='flex justify-center items-center gap-5 mt-3.5'>
          <TextField id="outlined-basic" type="file" variant="outlined" className='w-1/3' error={!!errors.logoImage}  {...register('logoImage', { required: true })} />
        </Box>
        <Box className='flex justify-center items-center gap-5'>
          {errors.logoImage && <span>Can not be empty!</span>}
        </Box>
        <Box className='flex justify-center items-center gap-5 mt-3.5'>
          <TextField id="outlined-basic" type="file" variant="outlined" className='w-1/3' error={!!errors.bannerImage}  {...register('bannerImage', { required: true })} />
        </Box>
        <Box className='flex justify-center items-center gap-5'>
          {errors.bannerImage && <span>Can not be empty!</span>}
        </Box>
        <Box className='flex justify-center items-center gap-5 mt-3.5'>
          <TextField id="outlined-basic" label="description" variant="outlined" className='w-1/3' error={!!errors.description}  {...register('description', { required: true })} />
        </Box>
        <Box className='flex justify-center items-center gap-5'>
          {errors.description && <span>Can not be empty!</span>}
        </Box>
        {/* <Box className='flex justify-center items-center gap-5 mt-3.5'>
          <TextField id="outlined-basic" label="categoryId" variant="outlined" className='w-1/3' error={!!errors.categoryId}  {...register('categoryId', { required: true })} />
        </Box>
        <Box className='flex justify-center items-center gap-5'>
          {errors.categoryId && <span>Can not be empty!</span>}
        </Box> */}
        <Box className='flex justify-center items-center gap-5 mt-3.5'>
          <FormControl error={!!errors.categoryId} className='w-1/3 mx-auto'>
            <InputLabel>Category</InputLabel>
            <Select
              value={getValues('category')}
              label="Category"
              onChange={handleChange}
              {...register('categoryId')}
              defaultValue={categories[0].categoryId}
            >
              {categories?.map(item => (
                <MenuItem value={item.categoryId}>{item.categoryName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box className='flex justify-center items-center gap-5'>
          {errors.categoryId && <span>Can not be empty!</span>}
        </Box> *
        {/* <Box className='flex justify-center items-left gap-5 mt-5'>
        FeaturedImage
        <IconButton color="primary" aria-label="upload picture" component="label" >
          <input hidden accept="image/*" type="file"  {...register('photo', { required: true })} />
          <PhotoCamera />
          {errors.photo && <span>Can not be empty!</span>}
        </IconButton>
      </Box>
      <Box className='flex justify-center items-left gap-5 mt-5'>
        LogoImage
        <IconButton color="primary" aria-label="upload picture" component="label" >
          <input hidden accept="image/*" type="file"  {...register('photo', { required: true })} />
          <PhotoCamera />
          {errors.photo && <span>Can not be empty!</span>}
        </IconButton>
      </Box>
      <Box className='flex justify-center items-left gap-5 mt-5'>
        BannerImage
        <IconButton color="primary" aria-label="upload picture" component="label" >
          <input hidden accept="image/*" type="file"  {...register('photo', { required: true })} />
          <PhotoCamera />
          {errors.photo && <span>Can not be empty!</span>}
        </IconButton>
      </Box> */}

        <Box className='flex justify-center'> <Button onClick={handleSubmit(connectCreateCollectService)} className="text-white mt-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-10 py-3 text-center mr-2 mb-2">submit</Button></Box>
      </div>
    </div>

  )
}

export default CreateCollectionV1