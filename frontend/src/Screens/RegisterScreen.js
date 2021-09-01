import React, { useState, useEffect } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import Axios from "axios";
import { useHistory, Link } from "react-router-dom";

export default function Register() {
  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      history.push("/");
    }
  }, [history]);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const user = {
        fullName,
        username,
        dob,
        phoneNumber,
        email,
        password,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await Axios.post("/api/users", user, config);
      window.location.replace("/");
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <Container className="login_form">
        <Card className="form_card">
          <Card.Body>
            <Form onSubmit={submitHandler}>
              <h6 style={{ textAlign: "center", padding: "20px" }}>
                Create an Account
              </h6>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Jhon Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="johndoe99"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="9876543219"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="johndoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Re-enter Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="d-grid gap-2 login_form_submit">
                <Button className="custom_button" type="submit">
                  Sign Up
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Container style={{ paddingBottom: "40px" }}>
        <h6 className="login_form_text">
          Already have an account ?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            {" "}
            &nbsp; Log in
          </Link>{" "}
        </h6>
      </Container>
    </div>
  );
}
