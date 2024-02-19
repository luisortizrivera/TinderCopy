import React from "react";

const EnterField = ({
  form,
  divClassName = "form-floating",
  inputClassName,
  handleChange,
  label,
  placeholder,
  type,
}) => {
  return (
    <div className={divClassName}>
      <input
        name={label.toLowerCase()}
        type={type}
        className={inputClassName}
        id={`floating${label}`}
        value={form[label]}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <label htmlFor={`floating${label}`}>{label}</label>
    </div>
  );
};

export default EnterField;
