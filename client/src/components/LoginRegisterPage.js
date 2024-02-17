import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "../Styles/LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
          <h2 className="h3 mb-3 fw-normal text-center text-white">
            Please {form.isRegistering ? "register" : "sign in"}
          </h2>
          <div
            id="registeringBlock"
            style={{
              maxHeight: form.isRegistering ? "1000px" : "0",
              opacity: form.isRegistering ? "1" : "0",
            }}
          >
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="nameInput"
                value={form.name}
                onChange={handleChange}
                placeholder="Nick"
              />
              <label htmlFor="NameInput">Name</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="surnameInput"
                value={form.surname}
                onChange={handleChange}
                placeholder="Surname"
              />
              <label htmlFor="surnameInput">Surname</label>
            </div>
          </div>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="emailInput"
              value={form.email}
              onChange={handleChange}
              placeholder="name@example.com"
            />
            <label htmlFor="emailInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
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
          <Button className="btn btn-primary w-100 py-2" type="submit">
            {form.isRegistering ? "Register" : "Sign in"}
          </Button>
          <Button
            className="btn btn-primary w-100 py-2 mt-3"
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
