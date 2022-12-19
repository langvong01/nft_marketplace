import React from 'react';
import formStyle from '../../AccountPage/Form/Form.module.css';
import ErrorMsg from './ErrorMessage/ErrorMessage';

const Input = React.forwardRef(
  (
    { onChange, label, type, placeholder, register, errors,  },
    ref
  ) => {
    return (
      <div className={formStyle.Form_box_input}>
        <label htmlFor="nft" className="text-capitalize">
          * {label}
        </label>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={formStyle.Form_box_input_userName}
          {...register(label, {
            required: 'This filed  is required.',
            onChange: onChange,
            maxLength: {
              value: 255,
              message: 'This input must maximum  characters',
            },
          })}
        />
        <ErrorMsg errors={errors} label={label} />
      </div>
    );
  }
);

export default Input;
