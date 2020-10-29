import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import NavigationBar from "../Components/NavigationBar";

const Login = ({ history }) => {
  const [formData, setFormData] = useState(null);
  const { setCurrentUser } = useContext(AppContext);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/login", formData)
      .then((res) => {
        sessionStorage.setItem("user", res.data);
        setCurrentUser(res.data);
        history.push("/home");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <NavigationBar />
      <h3 className="welcome">Welcome back!</h3>

      <Container className="container d-flex flex-column align-items-center justify-content-center fullscreen">
        <Form style={{ width: "300px" }} onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label htmlFor="email">Username</Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Button id="button" variant="dark" type="submit" block>
              Login
            </Button>
          </Form.Group>
          <Form.Group>
            <Link to="/">Need an Account? Sign up.</Link>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default Login;
