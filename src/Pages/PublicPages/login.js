import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Alert, Row, Col } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import { validateInput } from "../utils";
import * as Components from "../../Components";

export default withRouter(function Login() {
  const history = useHistory();
  let [validationErrorMessage, setValidationErrorMessage] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [email, setEmail] = React.useState("");

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
    setEmail("");
    setPassword("");
  };

  const onSubmit = () => {
    setValidationErrorMessage("");
    if (!validateInput(email, "email")) {
      setValidationErrorMessage("Invalid email");
    } else if (!validateInput(password, "password")) {
      setValidationErrorMessage(
        "Password must include atleat one character, one number and one special chanracter. Should be of length greater then 8"
      );
    } else {
      var userList = localStorage.getItem("user_list")
        ? JSON.parse(localStorage.getItem("user_list"))
        : null;

      if (!userList && !userList[email]) {
        setValidationErrorMessage(
          "Email not registered with us. Please register first"
        );
      }

      if (userList && userList[email] && userList[email].password) {
        localStorage.setItem("is_login", "yes");
        history.push("/users");
      } else {
        setValidationErrorMessage("Email or password incorrect. ");
      }
    }
  };

  console.log("login page");

  return (
    <Row>
      <Col>
        <h2>Welcom back!</h2>
        <h6 style={{ color: "gray" }}>Please login to your account</h6>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Components.CustomInput
            forGroupClass="mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
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
          <Row className="mb-4">
            <Col>
              <Form.Check type="checkbox" label="Remember me" />
            </Col>
            <Col style={{ textAlign: "end" }}>
              <Link to={"#"} onClick={(e) => e.preventDefault()}>
                Forgot Password
              </Link>
            </Col>
          </Row>
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
              <Link to={"/registration"}>
                <Components.CustomButton
                  style={{ width: "100%" }}
                  className="mb-2"
                >
                  Register
                </Components.CustomButton>
              </Link>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
});
