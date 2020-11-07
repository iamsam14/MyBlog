import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import NavigationBar from "./NavigationBar";

const CreateArticle = ({ history }) => {
  const [form, setForm] = useState({});

  const handleSubmit = (e) => {
    const formData = e.target;
    e.preventDefault();
    try {
      axios.post("/api/posts/add", form);
      setForm({});
      formData.reset();
    } catch (error) {
      console.log(error);
    }
    history.push("/articles");
  };
  return (
    <>
      <NavigationBar />
      <div style={{ textAlign: "left" }}>
        <h2 style={{ textAlign: "center", margin: "2rem" }}>
          Hey there! On this page you can add the title of your recipe and its
          ingredients and steps for others to see
        </h2>
        <Form
          onSubmit={handleSubmit}
          className="container d-flex flex-column align-items-center justify-content-center fullscreen"
        >
          <Form.Group controlId="basicForm" style={{ width: "300px" }}>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Article Title"
              required={true}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group style={{ width: "300px" }}>
            <Form.Label>Article</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Article Text"
              rows="4"
              required={true}
              onChange={(e) => setForm({ ...form, article: e.target.value })}
            />
          </Form.Group>
          <Button
            className="button-style"
            style={{ backgroundColor: "#dc7fa1" }}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CreateArticle;
