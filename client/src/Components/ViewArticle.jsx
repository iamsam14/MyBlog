import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import { AppContext } from "../Context/AppContext";

const ViewArticle = ({ history }) => {
  const [postData, setPostData] = useState({});
  const { currentUser } = useContext(AppContext);

  let { id } = useParams();

  const handleDelete = () => {
    axios.delete(`/api/post/delete/${id}`, { withCredentials: true });
    history.push("/articles");
  };

  useEffect(() => {
    axios
      .get(`/api/post/${id}`)
      .then((res) => {
        setPostData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <NavigationBar />
      <div className="article_top">
        <a href="/articles">Back to Articles</a>
      </div>
      <section className="articles">
        <h1>{postData.title}</h1>
        <h3>{postData.author}</h3>
        <h6>{postData.dateCreated}</h6>
        <p style={{ whiteSpace: "pre-wrap", marginRight: "1.5rem" }}>
          {postData.article}
        </p>
      </section>
      <div style={{ marginLeft: "2rem", marginTop: "2rem" }}>
        {currentUser && currentUser._id === postData.authorID ? (
          <>
            <button
              className="delete-button button-style"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
            <button
              className="edit-button button-style"
              onClick={() => history.push(`/edit/${id}`)}
            >
              Edit
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ViewArticle;
