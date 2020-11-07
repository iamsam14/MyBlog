import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const EditArticle = ({ history }) => {
  const [form, setForm] = useState({});

  let { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.patch(`/api/post/${id}`, form);
    } catch (error) {
      console.log(error);
    }
    history.push("/articles");
  };

  useEffect(() => {
    axios.get(`/api/post/${id}`).then((res) => {
      setForm(res.data);
    });
    return () => {
      // cleanup;
    };
  }, []);
  return (
    <>
      <NavigationBar />
      <br />
      <br />
      <Form
        className="container d-flex flex-column align-items-center justify-content-center fullscreen"
        onSubmit={handleSubmit}
      >
        <Form.Group style={{ width: "300px" }}>
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={form.title}
            type="text"
            placeholder="Article Title"
            required={true}
            name="title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group style={{ width: "300px" }}>
          <Form.Label>Article</Form.Label>
          <Form.Control
            value={form.article}
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
    </>
  );
};

export default EditArticle;
