import Profile from '@/components/NavBar/Profile/Profile';
import React from 'react';
import { useState } from 'react';
import NFTDescription from './nft-description/NFTDescription';
import NFTDetailsImg from './nft-details-img/NFTDetailsImg';
import NFTActivity from './nft-item-activity/NFTActivity';
import { TiArrowSortedDown, TiArrowSortedUp , TiThList } from 'react-icons/ti';


//INTERNAL IMPORT

import Style from './NFTDetailsPage.module.css';

const NFTDetailsPage = () => {
  const [activity, setActivity] = useState(true);

  const openActivity = () => {
    if (!activity) {
      setActivity(true);
    } else {
      setActivity(false);
    }
  };

  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg />
        <NFTDescription />
      </div>
      <div className={Style.NFTDetailsPage_activity_wrapper}>
        <div
          className={Style.NFTDetailsPage_activity_box}
          onClick={() => openActivity()}
        >
          <div className='d-flex align-items-center'>
          <TiThList/>
          <p>Item Activity</p>
          </div>
          {activity ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {activity && (
          <div className={Style.NFTDetailsPage_card}>
            <NFTActivity />
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetailsPage;
