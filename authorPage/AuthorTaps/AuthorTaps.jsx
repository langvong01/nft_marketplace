import React, { useState } from 'react';
import Image from 'next/image';
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from 'react-icons/ti';

//INTERNAL IMPORT
import Style from './AuthorTaps.module.css';

const AuthorTaps = ({ setCollectiables, setCreated , setCollectionOwned }) => {
  const [activeBtn, setActiveBtn] = useState(1);

  const openTab = (e) => {
    const btnText = e.target.innerText;
    if (btnText == 'Collected') {
      setCollectiables(true);
      setCreated(false);
      setCollectionOwned(false)
      setActiveBtn(1);
    }
    if (btnText == 'Created') {
      setCollectiables(false);
      setCreated(true);
      setActiveBtn(2);
      setCollectionOwned(false)
    }

    if (btnText == 'Collections') {
      setCollectionOwned(true)
      setCollectiables(false);
      setCreated(false);
      setActiveBtn(3);
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
              Collected
            </button>
            <button
              className={`${activeBtn == 2 ? Style.active : ''}`}
              onClick={(e) => openTab(e)}
            >
              Created
            </button>
            <button
              className={`${activeBtn == 3 ? Style.active : ''}`}
              onClick={(e) => openTab(e)}
            >
              Collections
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorTaps;
