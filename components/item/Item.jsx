import { cartState } from 'global-state/cart';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { toast } from 'react-toastify';

import { useRecoilState } from 'recoil';
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
  overflow: hidden;

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

const Item = ({ item }) => {
  const [cart, setCart] = useRecoilState(cartState);

  const router = useRouter();
  const notify = () => toast('Wow so easy!');
  const handleAddItem = (item) => {
    setCart((prev) => {
      const newArray = [...new Set([...prev.idItemSelected, item.itemId])];
      let newArrayItem = [...new Set([...prev.items, item])];

      return { ...prev, idItemSelected: newArray, items: newArrayItem };
    });
  };

  const handleRemoveCart = (item) => {
    setCart((prev) => {
      let newArrayId = [...new Set([...prev.idItemSelected, item.itemId])];

      //delete id
      newArrayId = newArrayId.filter((id) => {
        return id !== item.itemId;
      });

      const newArrayItem = prev.items.filter((itemMap) => {
        return item.itemId !== itemMap.itemId;
      });

      return { ...prev, idItemSelected: newArrayId, items: newArrayItem };
    });
  };

  return (
    <>
      <ItemStyles onClick={() => router.push(`/NFT-details/${item.itemId}`)}>
        <div className=" item-img w-full h-[270px] overflow-hidden ">
          <img
            className=" w-full  object-cover h-full bg-center"
            alt=""
            src={item.mediaFileUrl}
          />
        </div>

        <div className="w-full p-2 mt-3">
          <p className="font-bold text-xl ">
            {item.itemName} <spa className="ml-1 w-[50px]"># {item.itemId}</spa>
          </p>
          <p className="font-bold text-xl ">
            {item.price} <span className="ml-1 w-[50px] text-right">Meta</span>
          </p>

          <p className="text-base mt-2">End in 7 days</p>
        </div>
        <div className="item-btn py-2 bg-blue-500 absolute bottom-0 w-full text-center text-white  translate-y-[45px] ">
          {!cart.idItemSelected.includes(item.itemId) ? (
            <button
              onClick={() => handleAddItem(item)}
              className="btn-item w-full"
              suppressHydrationWarning
            >
              Add Cart
            </button>
          ) : (
            <button
              className="btn-item w-full"
              onClick={() => handleRemoveCart(item)}
              suppressHydrationWarning
            >
              Remove Cart
            </button>
          )}
        </div>
      </ItemStyles>
    </>
  );
};

export default Item;
