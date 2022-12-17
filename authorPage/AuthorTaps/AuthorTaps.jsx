import React, { useState } from 'react';
import Image from 'next/image';
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from 'react-icons/ti';

//INTERNAL IMPORT
import Style from './AuthorTaps.module.css';

const AuthorTaps = ({ setCollectiables, setCreated }) => {
  const [activeBtn, setActiveBtn] = useState(1);

  const openTab = (e) => {
    const btnText = e.target.innerText;
    if (btnText == 'Collectiables') {
      setCollectiables(true);
      setCreated(false);
      setActiveBtn(1);
    }
    if (btnText == 'Created') {
      setCollectiables(false);
      setCreated(true);
      setActiveBtn(2);
    }
  };

  return (
    <div className={Style.AuthorTaps}>
      <div className={Style.AuthorTaps_box}>
        <div className={Style.AuthorTaps_box_left}>
          <div className={Style.AuthorTaps_box_left_btn}>
            <button
              className={`${activeBtn == 1 ? Style.active : ''}`}
              onClick={(e) => openTab(e)}
            >
              Collectiables
            </button>
            <button
              className={`${activeBtn == 2 ? Style.active : ''}`}
              onClick={(e) => openTab(e)}
            >
              Created
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorTaps;
