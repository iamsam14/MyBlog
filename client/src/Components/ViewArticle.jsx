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
    axios.get(`/api/post/${id}`).then((res) => {
      setPostData(res.data);
    });
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
        <p>{postData.article}</p>
      </section>
      <div className="article_top">
        {currentUser && currentUser._id === postData.authorID ? (
          <>
            <button onClick={() => handleDelete()}>Delete</button>
            <button onClick={() => history.push(`/edit/${id}`)}>Edit</button>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ViewArticle;
