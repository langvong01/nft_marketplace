import React from 'react';
import Item from '../item/Item';
import { v4 as uuidv4 } from 'uuid';

const ListItem = ({ items }) => {
  return (
    <>
      <div className="list-container w-[95%] mx-auto my-5">
        <div className="list-container grid grid-cols-4 gap-5">
          {items.map((item) => {
            if (item.price) {
              return <Item item={item} key={uuidv4()}></Item>;
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </>
  );
};

export default ListItem;
