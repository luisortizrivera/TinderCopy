import React, { useState, useEffect } from "react";
import ProfileSetting from "./ProfileSetting";
import "../Styles/RegisterPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

/**
 * Represents the Register/Login page component.
 * @component
 * @returns {JSX.Element} RegisterLoginPage component
 */
const RegisterLoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isBasicDataFilled, setIsBasicDataFilled] = useState(false);
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    profileImg: "",
    bio: "",
  });

  /**
   * Handles the change event for input fields.
   * @param {Event} e - The change event object.
   */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Clears the errors array when the user changes from registering to logging in.
   */
  useEffect(() => {
    setErrors([]);
  }, [isRegistering]);

  /**
   * Handles the main submission event.
   * If isRegistering is true, it checks if the form is valid and sets the isBasicDataFilled state to true so it can show the profile settings form.
   * If isRegistering is false, it submits the data to the server so the user can log in.
   * @param {Event} e - The event object.
   */
  const handleMainSubmission = (e) => {
    e.preventDefault();
    const targetForm = e.currentTarget;
    const isValid = targetForm.checkValidity();
    setValidated(true);
    if (isRegistering) {
      if (targetForm.id === "dataForm" && isValid) {
        setValidated(false);
        setIsBasicDataFilled(true);
      } else if (targetForm.id === "profileSettingsForm" && isValid)
        submitData("register");
    } else if (!isRegistering) submitData("login");
  };

  /**
   * Submits data to the specified endpoint, register or login.
   * If the response status is 200 and the user is logging in, it sets the auth_token in the local storage and redirects the user to the chat page.
   * If the response status is 200 and the user is registering, it redirects the user to the home page.
   * If the response status is 400 or 401, it sets the errors state to the response body errors.
   * @param {string} endpoint - The endpoint to send the data to.
   */
  async function submitData(endpoint) {
    try {
      const response = await fetch(`/api/user/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const responseBody = await response.json();

      if ([400, 401].includes(response.status) && responseBody.errors)
        setErrors(responseBody.errors);
      else if (response.status === 200 && !isRegistering) {
        localStorage.setItem("auth_token", responseBody.token);
        window.location.href = "/chatPage";
      } else if (response.status === 200 && isRegistering)
        window.location.href = "/";
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <>
      <div className="loginRegisterContainer">
        <div
          className={`mainDataFields disappear-transition ${
            isBasicDataFilled ? "hide" : "show"
          }`}
        >
          <h2 className="h2 mb-3 text-white w-100 text-center">
            Please {isRegistering ? "register" : "sign in"}
          </h2>
          <Form
            className="w-100"
            id="dataForm"
            noValidate
            validated={validated}
            onSubmit={handleMainSubmission}
          >
            <div
              className={`registering-data moveAndDissappear-transition ${
                isRegistering ? "show" : "hide"
              }`}
            >
              <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="text-white">Name</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  name="name"
                  placeholder="John"
                  required
                />
                <Form.Control.Feedback type="invalid" className="text-white">
                  Please provide a name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label className="text-white">Surname</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  name="surname"
                  placeholder="Doe"
                  required
                />
                <Form.Control.Feedback type="invalid" className="text-white">
                  Please provide a surname.
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="login-data ">
              <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                />
                <Form.Control.Feedback type="invalid" className="text-white">
                  Please provide an email.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mb-2 position-relative"
                controlId="exampleForm.ControlInput4"
              >
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="p@sw0rd!."
                  required
                />
                <Form.Control.Feedback type="invalid" className="text-white">
                  Please provide a password.
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Form>
          <div className="d-grid gap-2">
            <Button
              data-testid="submit-button"
              className="btn btn-primary py-2"
              type="submit"
              form="dataForm"
            >
              {isRegistering ? "Register" : "Sign in"}
            </Button>
            <Button
              data-testid="change-btw-login-register-button"
              className="btn btn-primary py-2 mt-1"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering
                ? "Already have an account? Sign in"
                : "Don't have an account? Register"}
            </Button>
          </div>
        </div>
        <ProfileSetting
          form={form}
          handleChange={handleChange}
          isBasicDataFilled={isBasicDataFilled}
          setIsBasicDataFilled={setIsBasicDataFilled}
          handleMainSubmission={handleMainSubmission}
          validated={validated}
        />
      </div>
      {errors && errors.length > 0 && (
        <ToastContainer position="top-end" className="top-0 end-0 p-3">
          <Toast show={true} animation={true}>
            <Toast.Header
              className="justify-content-center align-align-items-center"
              closeButton={false}
            >
              <strong className="mr-auto">Authentication Error</strong>
            </Toast.Header>
            <Toast.Body>{errors[0].msg}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  );
};
export default RegisterLoginPage;
