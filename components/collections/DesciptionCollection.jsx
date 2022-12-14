import React, { useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const DesciptionCollection = ({ collection, items }) => {
  const [isSeeMore, setIsSeeMore] = useState(false);

  return (
    <>
      <div className="desc-col-container w-[95%] mx-auto mt-[120px]">
        <div className="desc-col-top flex items-centers justify-between">
          <p className="desc-col-name text-3xl capitalize">
            {collection.collectionName}
          </p>
          <div className="desc-col-social flex items-center gap-x-5">
            <span className="w-[50px] h-[50px] cursor-pointer">
              <FacebookIcon className="w-full h-full"></FacebookIcon>
            </span>

            <span className="w-[50px] h-[50px] cursor-pointer">
              <EmailIcon className="w-full h-full"></EmailIcon>
            </span>

            <span className="w-[50px] h-[50px] cursor-pointer">
              <TwitterIcon className="w-full h-full"></TwitterIcon>
            </span>
          </div>
        </div>

        <div className="desc-col-text">
          <p className="text-xl font-normal">
            Items :
            <span className="font-bold text-base ml-1">{items.length}</span>
          </p>

          <p className="text-base mt-2 font-normal w-[60%]">
            {!isSeeMore ? (
              <>{collection.description}</>
            ) : (
              <>
                1337 skulls is a collection of 7,331 pixel art skulls, deployed
                fully on-chain with a public domain license. 600+ traits created
                from new, original art and referencing 30+ existing cc0 NFT
                projects. Free mint. 0% royalties. 1337 skulls is a collection
                of 7,331 pixel art skulls, deployed fully on-chain with a public
                domain license. 600+ traits created from new, original art and
                referencing 30+ existing cc0 NFT projects. Free mint. 0%
                royalties
              </>
            )}
          </p>

          <button
            className="flex items-center mt-2"
            onClick={() => setIsSeeMore(!isSeeMore)}
          >
            {!isSeeMore ? (
              <>
                <span className="text-base font-normal  block"> See more</span>

                <span className="w-[30px] h-[30px]">
                  <KeyboardArrowUpIcon className="w-full"></KeyboardArrowUpIcon>
                </span>
              </>
            ) : (
              <>
                <span className="text-base font-normal"> See less</span>

                <span className="w-[30px] h-[30px]">
                  <KeyboardArrowDownIcon className="w-full"></KeyboardArrowDownIcon>
                </span>
              </>
            )}
          </button>
        </div>

        <div className="desc-col-value w-[60%] mt-2">
          <p className="text-2xl text-left">
            <span>{collection.totalValue || 0}</span>
            <span className="text-base font-normal block">total volume</span>
          </p>
        </div>

        <div className="line w-full h-[3px] mt-2 bg-slate-100"></div>
      </div>
    </>
  );
};

export default DesciptionCollection;
