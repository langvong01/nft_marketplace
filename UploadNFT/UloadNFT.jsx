// import React, { useState } from 'react';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient';
// import { MdOutlineHttp, MdOutlineAttachFile } from 'react-icons/md';
// import { FaPercent } from 'react-icons/fa';
// import { AiTwotonePropertySafety } from 'react-icons/ai';
// import { TiTick } from 'react-icons/ti';
// import Image from 'next/image';
//INTERNAL IMPORT
// import Style from './Upload.module.css';
// import formStyle from '../AccountPage/Form/Form.module.css';
// import images from '../img';
// import { DropZone } from '../UploadNFT/uploadNFTIndex.js';
// import Button from '@/components/button/Button';

// const UloadNFT = () => {
//   const [active, setActive] = useState(0);
//   const [itemName, setItemName] = useState('');
//   const [website, setWebsite] = useState('');
//   const [description, setDescription] = useState('');
//   const [royalties, setRoyalties] = useState('');
//   const [fileSize, setFileSize] = useState('');
//   const [category, setCategory] = useState(0);
//   const [properties, setProperties] = useState('');

//   const categoryArry = [
//     {
//       image: images.nft_image_1,
//       category: 'Sports',
//     },
//     {
//       image: images.nft_image_2,
//       category: 'Arts',
//     },
//     {
//       image: images.nft_image_3,
//       category: 'Music',
//     },
//     {
//       image: images.nft_image_1,
//       category: 'Digital',
//     },
//     {
//       image: images.nft_image_2,
//       category: 'Time',
//     },
//     {
//       image: images.nft_image_3,
//       category: 'Photography',
//     },
//   ];

//   return (
//     <div className={Style.upload}>
//       <DropZone
//       // title="JPG, PNG, WEBM , MAX 100MB"
//       // heading="Drag & drop file"
//       // subHeading="or Browse media on your device"
//       itemName={itemName}
//       // website={website}
//       description={description}
//       // royalties={royalties}
//       // fileSize={fileSize}
//       category={category}
//       // properties={properties}
//       // image={images.upload}
//       />

//       <div className={Style.upload_box}>
//         <div className={formStyle.Form_box_input}>
//           <label htmlFor="nft">Name</label>
//           <input
//             type="text"
//             placeholder="shoaib bhai"
//             className={formStyle.Form_box_input_userName}
//             onChange={(e) => setItemName(e.target.value)}
//           />
//         </div>

//         <div className={formStyle.Form_box_input}>
//           <label htmlFor="description">Description</label>
//           <textarea
//             name=""
//             id=""
//             cols="30"
//             rows="6"
//             placeholder="something about yourself in few words"
//             onChange={(e) => setDescription(e.target.value)}
//           ></textarea>
//         </div>

//         <div className={formStyle.Form_box_input}>
//           <label htmlFor="name">Choose collection</label>
//           <p className={Style.upload_box_input_para}>
//           </p>

//           <div className={Style.upload_box_slider_div}>
//             {categoryArry.map((el, i) => (
//               <div
//                 className={`${Style.upload_box_slider} ${active == i + 1 ? Style.active : ''
//                   }`}
//                 key={i + 1}
//                 onClick={() => (setActive(i + 1), setCategory(el.category))}
//               >
//                 <div className={Style.upload_box_slider_box}>
//                   <div className={Style.upload_box_slider_box_img}>
//                     <Image
//                       src={el.image}
//                       alt="background image"
//                       width={70}
//                       height={70}
//                       className={Style.upload_box_slider_box_img_img}
//                     />
//                   </div>
//                   <div className={Style.upload_box_slider_box_img_icon}>
//                     <TiTick />
//                   </div>
//                 </div>
//                 <p>Crypto Legend - {el.category} </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className={formStyle.Form_box_input_social}>
//           <div className={formStyle.Form_box_input}>
//             <label htmlFor="Royalties">Royalties</label>
//             <div className={formStyle.Form_box_input_box}>
//               <div className={formStyle.Form_box_input_box_icon}>
//                 <FaPercent />
//               </div>
//               <input
//                 type="text"
//                 placeholder="20%"
//                 onChange={(e) => setRoyalties(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className={formStyle.Form_box_input}>
//             <label htmlFor="Propertie">Propertie</label>
//             <div className={formStyle.Form_box_input_box}>
//               <div className={formStyle.Form_box_input_box_icon}>
//                 <AiTwotonePropertySafety />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Propertie"
//                 onChange={(e) => setProperties(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         <div className={Style.upload_box_btn}>
//           <Button
//             btnName="Upload"
//             handleClick={() => { }}
//             classStyle={Style.upload_box_btn_style}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
const BASE_API = 'http://localhost:8080/api/v1'

const UloadNFT = () => {
  const [categories, setCategory] = useState()

  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
  const handleChange = (event) => {
    setValue('categoryId', event.target.value);
  };


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
              label="Category"
              onChange={handleChange}
              value={getValues('categoryId')}
              defaultValue={categories?.[0].categoryId}
            >
              {categories?.map(item => (
                <MenuItem value={item.categoryId}>{item.categoryName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box className='flex justify-center'> <Button onClick={handleSubmit(connectCreateCollectService)} className="text-white mt-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-10 py-3 text-center mr-2 mb-2">submit</Button></Box>
      </div>
    </div>

  )
}

export default UloadNFT;
