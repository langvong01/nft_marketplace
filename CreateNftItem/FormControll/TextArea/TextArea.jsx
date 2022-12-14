import React from "react";
import formStyle from "../../../AccountPage/Form/Form.module.css";
import ErrorMsg from "../ErrorMessage/ErrorMessage";

const TextArea = React.forwardRef(
  ({ onChange, label, placeholder, register , errors }, ref) => {
    return (
      <div className={formStyle.Form_box_input}>
        <label htmlFor={label} className = "text-capitalize">{label}</label>
        <textarea
          ref={ref}
          name=""
          id=""
          cols="30"
          rows="6"
          placeholder={placeholder}
          {...register(label, {
            onChange: onChange,
            maxLength: {
              value: 300,
              message: "This content must maximum 300 characters",
            },
          })}
        ></textarea>
        <ErrorMsg errors={errors} label={label} />
      </div>
    );
  }
);

export default TextArea;
