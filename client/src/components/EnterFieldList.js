import React, { useState } from "react";
import EnterField from "./EnterField";
import "../Styles/LoginPage.css";

const EnterFieldList = ({ isRegistering }) => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fields = [
    {
      label: "Name",
      placeholder: "Nick",
      type: "text",
      className: "firstInput",
      registering: true,
    },
    {
      label: "Surname",
      placeholder: "Doe",
      type: "text",
      className: "middleInput",
      registering: true,
    },
    {
      label: "Email address",
      placeholder: "name@example.com",
      type: "email",
      className: isRegistering ? "middleInput" : "firstInput",
    },
    {
      label: "Password",
      placeholder: "Password",
      type: "password",
      className: "",
    },
  ];

  return fields.map((field) =>
    field.registering ? (
      isRegistering ? (
        <div
          id="registeringBlock"
          style={{
            maxHeight: isRegistering ? "1000px" : "0",
            opacity: isRegistering ? "1" : "0",
          }}
        >
          <EnterField
            form={form}
            divClassName="form-floating"
            inputClassName={`form-control ${field.className}`}
            handleChange={handleChange}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
          />
        </div>
      ) : null
    ) : (
      <EnterField
        form={form}
        divClassName="form-floating"
        inputClassName={`form-control ${field.className}`}
        handleChange={handleChange}
        label={field.label}
        placeholder={field.placeholder}
        type={field.type}
      />
    )
  );
};

export default EnterFieldList;
