import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
const EnterField = ({
  form,
  divClassName = "form-floating",
  inputClassName,
  handleChange,
  label,
  placeholder,
  type,
  errors,
}) => {
  const [show, setShow] = useState(true);
  return (
    <>
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
      {errors && errors.length > 0 && (
        <>
          <ToastContainer position="top-end" className="top-0 end-0 p-3">
            <Toast onClose={() => setShow(false)} show={show} animation={true}>
              <Toast.Header
                className="justify-content-center align-align-items-center"
                closeButton={false}
              >
                <strong className="mr-auto">Format Error</strong>
              </Toast.Header>
              <Toast.Body>{errors[0].msg}</Toast.Body>
            </Toast>
          </ToastContainer>
        </>
      )}
    </>
  );
};

export default EnterField;
