import React from 'react';
import {
  MdOutlineHttp,
  MdOutlineAttachFile,
  MdOutlinePriceChange,
} from 'react-icons/md';
import formStyle from '../../../AccountPage/Form/Form.module.css';
import ErrorMsg from '../ErrorMessage/ErrorMessage';

const InputWithIcon = React.forwardRef(
  ({ onChange, label, type, placeholder, register, errors, icon, initialValue ='' }, ref) => {
    return (
      <div className={formStyle.Form_box_input}>
        <label htmlFor={label} className="text-capitalize">
          {label}
        </label>
        <div className={formStyle.Form_box_input_box}>
          <div className={formStyle.Form_box_input_box_icon}>{icon}</div>
          <input
            defaultValue={initialValue}
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={formStyle.Form_box_input_userName}
            {...register(label, {
              required: 'This field  is required.',
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: 'You have entered an invalid email address!',
              },
              onChange: onChange,
            })}
          />
        </div>
        <ErrorMsg errors={errors} label={label} />
      </div>
    );
  }
);

export default InputWithIcon;
