import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import HomeNav from "../Components/HomeNav";
import swal from "sweetalert";

const SignUp = ({ history }) => {
  const [formData, setFormData] = useState(null);
  const { setCurrentUser } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = () => {
    axios
      .post("/api/users/login", formData)
      .then((res) => {
        sessionStorage.setItem("user", res.data);
        setCurrentUser(res.data);
        history.push("/home");
      })
      .catch((error) => console.log(error));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    axios
      .post("/api/users", formData)
      .then((res) => {
        sessionStorage.setItem("user", res.data);
        setCurrentUser(res.data);
        login();
      })
      .catch((error) => {
        swal("SignUp Error: ", error.toString());
      });
  };
  return (
    <div>
      <HomeNav />
      <h2 className="welcome m-5">Welcome to my food blog!</h2>
      <div className="rules mb-2">
        <ul className="password">
          Please fill out the form and make sure your password is:
          <li>8 characters long</li>
          <li>Includes at least one uppercase letter</li>
          <li>Includes a special character</li>
        </ul>
      </div>
      <Container className="container d-flex flex-column align-items-center justify-content-center fullscreen">
        <Form style={{ width: "300px" }} onSubmit={handleSignUp}>
          <Form.Group>
            <Form.Label htmlFor="fullName">Full Name</Form.Label>
            <Form.Control
              id="fullName"
              type="text"
              placeholder="Full Name"
              name="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="email">Email Address</Form.Label>
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
            <Button
              id="button"
              type="submit"
              block
              className="button-style"
              style={{ backgroundColor: "#dc7fa1" }}
            >
              Create Account
            </Button>
          </Form.Group>
        </Form>
        <Link to="/login">Already a member? Login.</Link>
      </Container>
    </div>
  );
};

export default SignUp;
