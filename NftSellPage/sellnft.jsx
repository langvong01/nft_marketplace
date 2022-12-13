import React from 'react';
import Style from './sellnft.module.css';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import Button from '@/components/Button/Button';
import {getItemDetails} from '../services/itemService'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SellNFT = () => {
  const router = useRouter();
  const {ItemId} = router.query
  const [price, setPrice] = useState(null);
  const [isDisabled,setIsDisabled] = useState(true)
  const [image, setImage] = useState(null);


  const fetchItemDetails = async () => {
    const data = await getItemDetails(ItemId);
    if (data) {
      const { mediaFileUrl} = data;
      setImage(mediaFileUrl)
    }
  };
  useEffect(() => {
    fetchItemDetails()
  },[ItemId])

  const handleChangePrice = (e) => {
    setPrice(e.target.value);

    if(+e.target.value > 0) {
        setIsDisabled(false)
    } else {
        setIsDisabled(true)
    }
  };

  
  const caculateTotalPrice = (price) => {
    return +(Math.round(price * 0.95  + 'e+2') + 'e-2');
  };

  return (
    <div className={Style.SellNftPage}>
      <div className={Style.SellNftPage_heading}>
        <h2>Sell Your Nft Here</h2>
        <p>
          You can set price, duration and more options before listing for sale
        </p>
      </div>
      <div className={Style.SellNftPage_box}>
        <div className={Style.SellNftPage_box_left}>
          <div className={Style.SellNftPage_box_left_img}>
            <Image
            loader={() => image}
              src={image|| undefined}
              objectFit="cover"
              width={300}
              height={300}
            />
          </div>
        </div>
        <div className={Style.SellNftPage_box_form}>
          <form action="">
            <div className={Style.SellNftPage_box_form_input}>
              <label htmlFor="price">Set Price</label>
              <TextField
                placeholder="Please enter type of number"
                onChange={handleChangePrice}
                type="text"
                fullWidth
                id="nft-price-adornment"
                sx={{
                  ' & .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
                    border: '1px solid #4c5773',
                    marginTop: '0.5rem',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">MATIC</InputAdornment>
                  ),
                }}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  maxLength: '10',
                }}
              />
            </div>
            <div className={Style.SellNftPage_box_form_summary}>
              <h2>Summary</h2>
              <div className={Style.SellNftPage_box_form_summary_row}>
                Listing price
                <span>{+price ? `${price} MATIC` : `--MATIC`}</span>
              </div>
              <div className={Style.SellNftPage_box_form_summary_row}>
                Service Fee
                <span>5 %</span>
              </div>
              <div className={Style.SellNftPage_box_form_summary_row}>
                Creator Fee
                <span>0 %</span>
              </div>
            </div>
            <div className={Style.SellNftPage_box_form_total}>
              Total Potential Earning
              <span>
                {+price ? `${caculateTotalPrice(price)} MATIC` : `--MATIC`}
              </span>
            </div>
            <Button
              btnName="Complete Listing"
              classStyle={Style.button_Sell}
              isDisabled =  {isDisabled}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellNFT;
