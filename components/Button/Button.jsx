import React from 'react';

//INTERNAL IMPORT
import Style from './Button.module.scss';

const Button = ({ btnName, handleClick, icon, classStyle, isDisabled ,type = "button" }) => {
  return (
    <div className={Style.box}>
      <button
        type = {type}
        disabled={isDisabled}
        className={`${Style.button} ${classStyle}`}
        onClick={(e) =>{
          // e.preventDefault();
          handleClick()
        }}
      >
        {icon} {btnName}
      </button>
    </div>
  );
};

export default Button;
