import { cartState } from 'global-state/cart';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';
import SnackBarSuccess from '@/components/SnackBarSucces/snackbar-succes';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { connectMetaMaskState } from 'global-state/connect-metamask';

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
  const [open, setOpen] = useState(false);

  const [cart, setCart] = useRecoilState(cartState);
  const [account, setCount] = useRecoilState(connectMetaMaskState);
  const [toast, setToast] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    message: null,
  });
  const router = useRouter();

  const handleAddItem = (e, item) => {
    e.stopPropagation();
    setCart((prev) => {
      const newArray = [...new Set([...prev.idItemSelected, item.itemId])];
      let newArrayItem = [...new Set([...prev.items, item])];

      return { ...prev, idItemSelected: newArray, items: newArrayItem };
    });

    setToast((prev) => {
      return { ...prev, open: true, message: 'Added to cart' };
    });
  };

  const handleRemoveCart = (e, item) => {
    e.stopPropagation();
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

    setToast((prev) => {
      return { ...prev, open: true, message: 'Removed to cart' };
    });
  };

  const handleNavigatePage = (event) => {
    router.push(`/NFT-details/${item.itemId}`);
  };

  useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <>
      {open ? (
        <ItemStyles onClick={(e) => handleNavigatePage(e)}>
          <div className=" item-img w-full h-[270px] overflow-hidden ">
            <img
              className=" w-full  object-cover h-full bg-center"
              alt=""
              src={item.mediaFileUrl}
            />
          </div>

          <div className="w-full flex-1 p-2 mt-3">
            <p className="font-semibold text-xl flex justify-between mb-2 ">
              <p className="w-[70%]">{item.itemName}</p>
              <span className="ml-1"># {item.tokenId}</span>
            </p>
            <p className="font-bold text-xl ">
              {item.price ? item.price : ''}
              {renderPrice(item.price)}
            </p>

            {/* <p className="text-base mt-2">End in 7 days</p> */}
          </div>
          {(item.ownedBy.walletAddress !== account.accountCurrent) && item.isOnSale ? (
            <div className="item-btn py-2 bg-blue-500 absolute bottom-0 w-full text-center text-white  translate-y-[45px] ">
              {!cart.idItemSelected.includes(item.itemId) ? (
                <button
                  onClick={(e) => handleAddItem(e, item)}
                  className="btn-item w-full"
                  suppressHydrationWarning
                >
                  Add Cart
                </button>
              ) : (
                <button
                  className="btn-item w-full"
                  onClick={(e) => handleRemoveCart(e, item)}
                  suppressHydrationWarning
                >
                  Remove Cart
                </button>
              )}
            </div>
          ) : null}
        </ItemStyles>
      ) : null}

      <SnackBarSuccess
        open={toast.open}
        vertical={toast.vertical}
        horizontal={toast.horizontal}
        message={toast.message}
        setToast={setToast}
      ></SnackBarSuccess>
    </>
  );
};
function renderPrice(price)
{
  if (price && price > 0) {
    return <span className="ml-1 w-[50px] text-right uppercase text-base">
                Matic
              </span>;
  } else {
    return <span className="ml-1 w-[50px] text-right uppercase text-base">
                Not for sale
              </span>;
  }
}
export default Item;
