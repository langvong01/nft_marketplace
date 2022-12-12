import React from 'react';
import Item from '../item/Item';

const ListItem = () => {
  return (
    <>
      <div className="list-container w-[95%] mx-auto my-5">
        <div className="list-container grid grid-cols-4 gap-5">
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
        </div>
      </div>
    </>
  );
};

export default ListItem;
