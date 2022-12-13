import React from 'react';

import Style from './SubTotalCart.module.css';

const SubTotalCart = ({ number }) => {
  return number ? (
    <div className={Style.sub_total_cart} suppressHydrationWarning>
      {number}
    </div>
  ) : (
    <div className={Style.sub_total_cart}>0</div>
  );
};

export default SubTotalCart;
