import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "../Styles/LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginRegisterPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState(""); // Added surname state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleSurnameChange = (e) => setSurname(e.target.value); // Added handleSurnameChange function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <section className="vh-100 d-flex align-items-center justify-content-center">
      <div className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <h2 className="h3 mb-3 fw-normal text-center">
            Please {isRegistering ? "register" : "sign in"}
          </h2>
          {isRegistering && (
            <>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Nick"
                />
                <label htmlFor="NameInput">Name</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="surnameInput"
                  value={surname}
                  onChange={handleSurnameChange}
                  placeholder="Surname"
                />
                <label htmlFor="surnameInput">Surname</label>
              </div>
            </>
          )}
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="emailInput"
              value={email}
              onChange={handleEmailChange}
              placeholder="name@example.com"
            />
            <label htmlFor="emailInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              value={password}
              onChange={handlePasswordChange}
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
            {isRegistering ? "Register" : "Sign in"}
          </Button>
          <Button
            className="btn btn-primary w-100 py-2 mt-3"
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
