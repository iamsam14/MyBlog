import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import NavigationBar from "../Components/NavigationBar";

const SignUp = ({ history }) => {
  const [formData, setFormData] = useState(null);
  const { setCurrentUser } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    axios
      .post("/api/users", formData)
      .then((res) => {
        sessionStorage.setItem("user", res.data);
        setCurrentUser(res.data);
        history.push("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <NavigationBar />
      <h2 className="welcome m-5">Welcome to my food blog!</h2>

      <Container>
        <Form onSubmit={handleSignUp}>
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
          <Form.Group className="">
            <Button id="button" variant="dark" type="submit" block>
              Create Account
            </Button>
          </Form.Group>
        </Form>
        <Link className="" to="/login">
          Already a member? Login.
        </Link>
      </Container>
    </div>
  );
};

export default SignUp;
