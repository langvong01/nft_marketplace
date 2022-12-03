import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosClient from '../../utils/axiosClient';
import Style from "../nft-card/NFTCard.module.css";
import Image from "next/image";

// import Style from "../nft-card/NFTCard.module.css";
// import Image from "../"";


//INTERNAL IMPORT
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const BASE_API = 'http://localhost:8080/api/v1'
const Filter = () => {
  const [categories, setCategory] = useState()
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const [collect, setCollect] = useState()
  const handleChange = (event) => {
    setValue('category', event.target.value);
  };

  const searchCcollection = async (data) => {
    data = {
      'category': { "category_id": data.categoryId },
      'collection_name_like': data.collection_name_like,
      "sort_by": ["total_value", "created_at"],
      "order": ["ASC", "DESC"],
      "page": 1,
      "size": data.size
    };

    try {

      const { data: { body: { content } } } = await axiosClient.post('/collection/filter', data)
      setCollect(content)


    } catch (error) {
      console.log(error);
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

  console.log(collect);

  const [like, setLike] = useState(true);

  const likeNft = () => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };
  return (
    <div clasName='format lg:format-lg'>
      <div className='container mt-10'>
        <Box className='flex justify-center items-center gap-5'>
          <TextField id="outlined-basic" label="Search by name..." variant="outlined" className='w-2/3' {...register('collection_name_like')} />
          <FormControl className='w-1/5 mx-auto'>
            <InputLabel>Category</InputLabel>
            <Select
              value={getValues('category')}
              label="Category"
              onChange={handleChange}
              {...register('categoryId')}
              defaultValue={categories?.[0].categoryId}>
              <MenuItem value="">All</MenuItem>
              {categories?.map(item => (
                <MenuItem value={item.categoryId}>{item.categoryName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className='w-1/6 mx-auto'>
            <InputLabel>size</InputLabel>
            <Select
              value={getValues('size')}
              label="size"
              onChange={handleChange}
              {...register('size')}
              defaultValue={10}
            >
              <MenuItem value={10}>{10}</MenuItem>
              <MenuItem value={30}>{30}</MenuItem>
              <MenuItem value={50}>{50}</MenuItem>
              <MenuItem value={100}>{100}</MenuItem>
            </Select>
          </FormControl>
          <Box className='flex justify-center'> <Button onClick={handleSubmit(searchCcollection)}
            className="text-white mt-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-10 py-3 text-center mr-2 mb-2">Search</Button>
          </Box>
        </Box>

      </div>
      <div className="mt-10">
        <div className={Style.NFTCard}>
          {collect && collect.map((item, index) => (
            <div className={Style.NFTCard_box} key={index}>
              <div className={Style.NFTCard_box_img}>
                <Image
                  src={item.featuredImage}
                  alt="NFT images"
                  width={600}
                  height={600}
                  className={Style.NFTCard_box_img_img}
                  unoptimized={true}

                />
              </div>

              <div className={Style.NFTCard_box_update}>
                <div className="ml-2 mt-2">
                  <Image
                    src={item.logoImage}
                    alt="NFT images"
                    width={40}
                    height={40}
                    className={Style.NFTCard_box_img_img}
                    unoptimized={true}
                  />
                </div>

                <div className={Style.NFTCard_box_update_right}>
                  <div className={Style.NFTCard_box_update_right_info}>
                    <div className="ml-4 mt-2">
                      <small>{item.createdAt}</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className={Style.NFTCard_box_update_details}>
                <div className={Style.NFTCard_box_update_details_price}>
                  <div className={Style.NFTCard_box_update_details_price_box}>
                    <h3 className="mt-2 ml-2">{item.collectionName}</h3>
                  </div>
                </div>
                <div className={Style.NFTCard_box_update_details_category}>
                  {/* <BsImages /> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
