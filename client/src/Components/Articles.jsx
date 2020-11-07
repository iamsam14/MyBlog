import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import { AppContext } from "../Context/AppContext";

const Articles = ({ history }) => {
  const [allPosts, setAllPosts] = useState(null);
  const { loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    axios.get("/api/posts").then((res) => {
      setLoading(true);
      setAllPosts(res.data);
      setLoading(true);
    });
  }, [loading, setLoading]);

  return (
    <>
      <NavigationBar />
      <div className="article_top">
        <button
          className="add-post button-style"
          onClick={() => history.push("/create")}
        >
          Add Post
        </button>
        <div className="articles">
          {allPosts
            ? allPosts.map((post) => {
                return (
                  <>
                    <div key={post._id}>
                      <a href={`/article/${post._id}`}>
                        <h3>{post.title}</h3>
                      </a>
                      <p>{post.article}</p>
                    </div>
                  </>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default Articles;
