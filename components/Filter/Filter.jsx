import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosClient from '/utils/axiosClient';
import images from "../../img";
import Style from "../nft-card/NFTCard.module.css";
// import Image from "../"";


//INTERNAL IMPORT
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AiFillHeart } from "react-icons/ai";

const BASE_API = 'http://localhost:8080/api/v1'
const Filter = () => {
  const [categories, setCategory] = useState()
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const handleChange = (event) => {
    setValue('category', event.target.value);
  };
  const searchCcollection = async (data) => {
    data = {
      'category': { "categoryId": data.categoryId },
      'collection_name_like': data.collection_name_like,
      "sort_by": ["total_value", "created_at"],
      "order": ["ASC", "DESC"],
      "page": 1,
      "size": 10
    };

    try {
      const response = await axiosClient.post('/collection/filter', data).json()
      const arr = setCollect(response.body)
      console.log(arr)

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


  //list
  const CardArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
  ];
  console.log(CardArray)
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
      <div className='container mx-auto my-12 mt-4'>
        <Box className='flex justify-center items-center gap-5'>
          <FormControl className='w-1/3 mx-auto'>
            <InputLabel>Category</InputLabel>
            <Select
              value={getValues('category')}
              label="Category"
              onChange={handleChange}
              {...register('categoryId')}
              defaultValue={categories?.[0].categoryId}
            >
              {categories?.map(item => (
                <MenuItem value={item.categoryId}>{item.categoryName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField id="outlined-basic" label="collection_name_like" variant="outlined" className='w-1/3' {...register('collection_name_like')} />
          {/* <TextField id="outlined-basic" type="date" variant="outlined" className='w-1/3' {...register('from_date')} />
          <TextField id="outlined-basic" type="date" variant="outlined" className='w-1/3'  {...register('to_date')} /> */}
        </Box>
        <Box className='flex justify-center'> <Button onClick={handleSubmit(searchCcollection)} className="text-white mt-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-10 py-3 text-center mr-2 mb-2">Search</Button>
        </Box>
      </div>
      <div>
        <div className={Style.NFTCard}>
          {CardArray.map((el, i) => (
            <div className={Style.NFTCard_box} key={i + 1}>
              <div className={Style.NFTCard_box_img}>
                {/* <Image
                  src={el}
                  alt="NFT images"
                  width={600}
                  height={600}
                  className={Style.NFTCard_box_img_img}
                /> */}
              </div>

              <div className={Style.NFTCard_box_update}>
                <div className={Style.NFTCard_box_update_left}>
                  <div
                    className={Style.NFTCard_box_update_left_like}
                    onClick={() => likeNft()}
                  >
                    {/* {like ? (
                      <AiOutlineHeart />
                    ) : (
                      <AiFillHeart
                        className={Style.NFTCard_box_update_left_like_icon}
                      /> */}
                    {/* )} */}
                    {""} 22
                  </div>
                </div>

                <div className={Style.NFTCard_box_update_right}>
                  <div className={Style.NFTCard_box_update_right_info}>
                    <small>Remaining time</small>
                    <p>3h : 15m : 20s</p>
                  </div>
                </div>
              </div>

              <div className={Style.NFTCard_box_update_details}>
                <div className={Style.NFTCard_box_update_details_price}>
                  <div className={Style.NFTCard_box_update_details_price_box}>
                    <h4>Clone #17373</h4>

                    <div className={Style.NFTCard_box_update_details_price_box_box}>
                      <div
                        className={Style.NFTCard_box_update_details_price_box_bid}
                      >
                        <small>Current Bid</small>
                        <p>1.000ETH</p>
                      </div>
                      <div
                        className={Style.NFTCard_box_update_details_price_box_stock}
                      >
                        <small>61 in stock</small>
                      </div>
                    </div>
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
