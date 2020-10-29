import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

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
      <Form onSubmit={handleSubmit}>
        <Form.Group>
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
        <Form.Group>
          <Form.Label>Article</Form.Label>
          <Form.Control
            value={form.article}
            type="text"
            placeholder="Article Text"
            rows="4"
            required={true}
            name="article"
            onChange={(e) => setForm({ ...form, article: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <button onClick={() => console.log(form)}>test</button>
    </>
  );
};

export default EditArticle;
