import React from 'react';
import styled from 'styled-components';

const ItemStyles = styled.div`
  min-height: 450px;
  position: relative;
  height: 100%;
  min-width: 200px;
  width: 100%;
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
    0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.5s;
  cursor: pointer;

  .item-btn {
    transition: all 0.2s;
    &:hover {
      opacity: 0.9 !important;
    }
  }

  &:hover {
    .item-img {
      img {
        transform: scale(1.1);
      }
    }

    .item-btn {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Item = () => {
  return (
    <ItemStyles>
      <div className=" item-img w-full h-[270px] overflow-hidden ">
        <img
          src="https://i.seadn.io/gae/4_58T7JRKZ6t2aX_FJ_m1JQJrauUvFlYgtSwKQdBERLktfsLUpUr_rfelfH-IH__wHD42qezGvL1X7vw6nmFC60z15YlEwx_AOSdYg?auto=format&w=750"
          className=" w-full  object-cover h-full bg-center"
          alt=""
        />
      </div>

      <div className="w-full p-2 mt-3">
        <p className="font-bold text-xl ">
          1337 skulls <spa className="ml-1 w-[50px]">#1227</spa>
        </p>
        <p className="font-bold text-xl ">
          0,22 <span className="ml-1 w-[50px] text-right">Meta</span>
        </p>

        <p className="text-base mt-2">End in 7 days</p>
      </div>

      <div className="item-btn py-2 bg-blue-500 absolute bottom-0 w-full text-center text-white  translate-y-[45px] ">
        <button>Add Cart</button>
      </div>
    </ItemStyles>
  );
};

export default Item;
