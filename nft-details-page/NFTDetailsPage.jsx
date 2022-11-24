import React from 'react';
import NFTDescription from './nft-description/NFTDescription';
import NFTDetailsImg from './nft-details-img/NFTDetailsImg';

//INTERNAL IMPORT

import Style from './NFTDetailsPage.module.css';

const NFTDetailsPage = () => {
  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg />
        <NFTDescription />
      </div>
    </div>
  );
};

export default NFTDetailsPage;
