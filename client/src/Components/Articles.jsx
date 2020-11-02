import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar";

const Articles = () => {
  const [allPosts, setAllPosts] = useState(null);

  useEffect(() => {
    axios.get("/api/posts").then((res) => {
      setAllPosts(res.data);
    });
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="article_top">
        <a href="/create">Add Post</a>
        <div className="articles">
          {allPosts
            ? allPosts
                .sort((a, b) => a.dateCreated - b.dateCreated)
                .map((post) => {
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
