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
      <div className="article_top" style={{ textAlign: "left" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="basicForm">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Article Title"
              required={true}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Article</Form.Label>
            <Form.Control
              type="text"
              placeholder="Article Text"
              rows="4"
              required={true}
              onChange={(e) => setForm({ ...form, article: e.target.value })}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CreateArticle;
