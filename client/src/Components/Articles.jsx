import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar";

const Articles = () => {
  const [allPosts, setAllPosts] = useState(null);

  useEffect(() => {
    axios.get("/posts").then((res) => {
      console.log("object");
      setAllPosts(res.data);
    });
  }, [allPosts]);

  return (
    <>
      <NavigationBar />
      <div className="article_top">
        <a href="/create">Add Post</a>
        <div className="articles">
          {allPosts
            ? allPosts.map((post) => {
                return (
                  <div key={post._id}>
                    <a href={`/article/${post._id}`}>
                      <h3>{post.title}</h3>
                    </a>
                    <p>{post.article}</p>
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
