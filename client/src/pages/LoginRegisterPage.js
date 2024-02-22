import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "../Styles/LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EnterFieldList from "../components/EnterFieldList";

const LoginRegisterPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [errors, setErrors] = useState(null);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form submitted:", form);
    try {
      const response = await fetch(
        `/api/user/${isRegistering ? "register" : "login"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const responseBody = await response.json();

      if (response.status === 400) {
        if (responseBody.errors) setErrors(responseBody.errors);
      } else if (response.status === 200) {
        // console.log(responseBody);
        localStorage.setItem("token", responseBody.token);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <section className="vh-100 d-flex align-items-center justify-content-center">
      <div className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <h2 className="h2 mb-3 fw-normal text-center text-white">
            Please {isRegistering ? "register" : "sign in"}
          </h2>
          <EnterFieldList
            isRegistering={isRegistering}
            formState={{ form, setForm }}
            errors={errors}
          />
          <div
            className={`checkBlock ${
              isRegistering ? "registering" : "not-registering"
            }`}
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
            {isRegistering ? "Register" : "Sign in"}
          </Button>
          <Button
            className="btn btn-primary w-100 py-2 mt-1"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering
              ? "Already have an account? Sign in"
              : "Don't have an account? Register"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default LoginRegisterPage;
