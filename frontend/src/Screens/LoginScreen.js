import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

export default function Login() {
  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      history.push("/");
    }
  }, [history]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "/api/users/login",
        { username, password },
        config
      );

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
                Enter your credentials here
              </h6>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
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

              <div className="d-grid gap-2 login_form_submit">
                <Button className="custom_button" type="submit">
                  Log in
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Container style={{ paddingBottom: "40px" }}>
        <h6 className="login_form_text">
          <Link to="/login" style={{ textDecoration: "none" }}>
            Forgot Password
          </Link>{" "}
        </h6>
        <h6 className="login_form_text">
          Don't have an account?{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            {" "}
            &nbsp;&nbsp; Click here
          </Link>{" "}
        </h6>
      </Container>
    </div>
  );
}
