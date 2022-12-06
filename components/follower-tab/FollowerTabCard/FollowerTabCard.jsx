import React, { useState } from 'react';
import Image from 'next/image';
import { MdVerified } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';

//INTERNAL IMPORT
import Style from './FollowerTabCard.module.scss';
const FollowerTabCard = ({ i, el }) => {
  const [following, setFollowing] = useState(false);

  const followMe = () => {
    if (!following) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  };
  return (
    <div className="h-[400px] w-[300px] border border-slate-400 rounded-[8px] !border-t-0  ">
      <div className={Style.FollowerTabCard_rank}>
        <p>
          #{i + 1} <span>🥇</span>
        </p>
      </div>

      <div className="!h-full !w-full ">
        <div className={Style.FollowerTabCard_box_img}>
          <Image
            className={Style.FollowerTabCard_box_img_img}
            src={el.background}
            alt="profile braground"
            width={500}
            height={400}
            objectFit="cover"
          />
        </div>

        <div className={Style.FollowerTabCard_box_profile}>
          <Image
            className={Style.FollowerTabCard_box_profile_img}
            alt="profile picture"
            width={50}
            height={50}
            src={el.user}
          />
        </div>

        <div className={Style.FollowerTabCard_box_info}>
          <div className="flex-1">
            <h4 className="text-base flex items-center gap-x-1">
              Giada Mann
              <span>
                <MdVerified />
              </span>
            </h4>
            <p>12.321 ETH</p>
          </div>

          <div className={Style.FollowerTabCard_box_info_following}>
            <button
              onClick={() => {}}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90"
            >
              Follow
              {/* <span>
                <TiTick />
              </span> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowerTabCard;
