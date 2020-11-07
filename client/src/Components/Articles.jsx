import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import { AppContext } from "../Context/AppContext";

const Articles = ({ history }) => {
  const [allPosts, setAllPosts] = useState(null);
  const { loading, setLoading } = useContext(AppContext);

  // const cutOff = (text) => {
  //   text.split("");
  //   while (text.length > 30) {
  //     text.pop();
  //   }
  //   text.join("");
  //   return text;
  // };

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
      <div style={{ marginTop: "2rem" }}>
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
                  <div key={post._id}>
                    <a
                      key={post.id + "1"}
                      href={`/article/${post._id}`}
                      style={{ color: "#74121D" }}
                    >
                      <h3 key={post.id + "2"}>{post.title}</h3>
                    </a>
                    <p key={post.id + "3"}>
                      {post.article.substring(0, 100)}...
                    </p>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default Articles;
