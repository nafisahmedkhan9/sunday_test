import React from "react";
import { Link } from "react-router-dom";
import { Form, Alert, Row, Col } from "react-bootstrap";
import { validateInput } from "../utils";
import { useHistory, withRouter } from "react-router-dom";
import * as Components from "../../Components";

export default withRouter(function Registration() {
  let history = useHistory();
  let [validationErrorMessage, setValidationErrorMessage] = React.useState("");
  let [name, setName] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [mobile, setMobile] = React.useState("");
  let [password, setPassword] = React.useState("");

  React.useEffect(() => {
    let isLoggedIn = localStorage.getItem("is_login");
    if (isLoggedIn === "yes") {
      history.push("/users");
    }

    return () => {
      resetState();
    };
    // eslint-disable-next-line
  }, []);

  const resetState = () => {
    setName("");
    setEmail("");
    setMobile("");
    setPassword("");
  };

  const onSubmit = () => {
    setValidationErrorMessage("");
    if (!validateInput(name, "name")) {
      setValidationErrorMessage("Only letters and spaces are allowed");
    } else if (!validateInput(email, "email")) {
      setValidationErrorMessage("Invalid email");
    } else if (!validateInput(mobile, "phone")) {
      setValidationErrorMessage("Invalid mobile");
    } else if (!validateInput(password, "password")) {
      setValidationErrorMessage(
        "Password must include atleat one character, one number and one special chanracter. Should be of length greater then 8"
      );
    } else {
      var userList = localStorage.getItem("user_list");
      var details = {
        password,
        name,
        email,
        mobile,
      };

      var newUserList = {};
      if (userList) {
        newUserList = JSON.parse(userList);
        if (newUserList[email]) {
          setValidationErrorMessage(
            "Email already register with us. Please login"
          );
        } else {
          newUserList[email] = details;
          localStorage.setItem("user_list", JSON.stringify(newUserList));
          history.push("/login");
          resetState();
        }
      } else {
        newUserList[email] = details;
        localStorage.setItem("user_list", JSON.stringify(newUserList));
        history.push("/login");
        resetState();
      }
    }
  };

  console.log("registration page");

  return (
    <Row>
      <Col>
        <h2>Register</h2>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Components.CustomInput
            forGroupClass="mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
          <Components.CustomInput
            forGroupClass="mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <Components.CustomInput
            forGroupClass="mb-3"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            type="number"
            placeholder="Mobile"
          />
          <Components.CustomInput
            forGroupClass="mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          {validationErrorMessage && (
            <Alert variant={"danger"}>{validationErrorMessage}</Alert>
          )}
          <Row>
            <Col md={12}>
              <Components.CustomButton
                onClick={() => onSubmit()}
                style={{ width: "100%" }}
                className="mb-2"
                type="submit"
              >
                Submit
              </Components.CustomButton>
            </Col>
            <Col md={12}>
              <Link to={"/login"}>
                <Components.CustomButton
                  style={{ width: "100%" }}
                  className="mb-2"
                >
                  Login
                </Components.CustomButton>
              </Link>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
});
