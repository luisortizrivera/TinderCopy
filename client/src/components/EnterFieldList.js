import React from "react";
import EnterField from "./EnterField";
import "../Styles/LoginPage.css";

const EnterFieldList = ({ isRegistering, formState, errors }) => {
  const { form, setForm } = formState;

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
      label: "Email",
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

  return fields.map((field, index) =>
    field.registering ? (
      <div
        key={index}
        className={`registeringBlock ${
          isRegistering ? "registering" : "not-registering"
        }`}
      >
        <EnterField
          form={form}
          divClassName="form-floating"
          inputClassName={`form-control ${field.className}`}
          handleChange={handleChange}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          errors={
            errors && errors.length > 0
              ? errors.filter(
                  (error) => error.path === field.label.toLowerCase()
                )
              : null
          }
        />
      </div>
    ) : (
      <EnterField
        key={index}
        form={form}
        divClassName="form-floating"
        inputClassName={`form-control ${field.className}`}
        handleChange={handleChange}
        label={field.label}
        placeholder={field.placeholder}
        type={field.type}
        errors={
          errors && errors.length > 0
            ? errors.filter((error) => error.path === field.label.toLowerCase())
            : null
        }
      />
    )
  );
};

export default EnterFieldList;
