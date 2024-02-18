import React, { useState } from "react";
import EnterField from "./EnterField";

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

  return fields
    .filter((field) => isRegistering || !field.registering)
    .map((field, index) => (
      <EnterField
        form={form}
        divClassName="form-floating"
        inputClassName={`form-control ${field.className}`}
        handleChange={handleChange}
        label={field.label}
        placeholder={field.placeholder}
        type={field.type}
      />
    ));
};

export default EnterFieldList;
