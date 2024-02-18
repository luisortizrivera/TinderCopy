import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "../Styles/LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EnterField from "./EnterField";

const LoginRegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    isRegistering: false,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", form.email);
    console.log("Password:", form.password);
  };

  return (
    <section className="vh-100 d-flex align-items-center justify-content-center">
      <div className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <h2 className="h2 mb-3 fw-normal text-center text-white">
            Please {form.isRegistering ? "register" : "sign in"}
          </h2>
          <div
            id="registeringBlock"
            style={{
              maxHeight: form.isRegistering ? "1000px" : "0",
              opacity: form.isRegistering ? "1" : "0",
            }}
          >
            <EnterField
              form={form}
              divClassName="form-floating"
              inputClassName="form-control firstInput"
              handleChange={handleChange}
              label="Name"
              placeholder="Nick"
              type="text"
            />
            <EnterField
              form={form}
              divClassName="form-floating"
              inputClassName="form-control middleInput"
              handleChange={handleChange}
              label="Surname"
              placeholder="Doe"
              type="text"
            />
          </div>

          <EnterField
            form={form}
            divClassName="form-floating"
            inputClassName={
              form.isRegistering
                ? "form-control middleInput"
                : "form-control firstInput"
            }
            handleChange={handleChange}
            label="Email address"
            placeholder="name@example.com"
            type="email"
          />

          <EnterField
            form={form}
            divClassName="form-floating"
            inputClassName="form-control"
            handleChange={handleChange}
            label="Password"
            placeholder="Password"
            type="password"
          />

          <div
            id="checkBlock"
            style={{
              maxHeight: form.isRegistering ? "1000px" : "0",
              opacity: form.isRegistering ? "1" : "0",
            }}
          >
            <div className="form-check text-start my-3">
              <input
                className="form-check-input"
                type="checkbox"
                value="remember-me"
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
              </label>
            </div>
          </div>
          <Button className="btn btn-primary w-100 py-2" type="submit">
            {form.isRegistering ? "Register" : "Sign in"}
          </Button>
          <Button
            className="btn btn-primary w-100 py-2 mt-1"
            onClick={() =>
              setForm({ ...form, isRegistering: !form.isRegistering })
            }
          >
            {form.isRegistering
              ? "Already have an account? Sign in"
              : "Don't have an account? Register"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default LoginRegisterPage;
