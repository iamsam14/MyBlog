import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import { AppContext } from "../Context/AppContext";

const Articles = () => {
  const [allPosts, setAllPosts] = useState(null);
  const { loading, setLoading } = useContext(AppContext);
  useEffect(() => {
    axios.get("/api/posts").then((res) => {
      setLoading(true);
      setAllPosts(res.data);
      setLoading(true);
    });
  }, [loading, setLoading]);

  const cutOff = (text) => {
    if (typeof text === String) {
      text.split("");
    }
    // if (text.length > 30) {
    //   text.pop();
    //   cutOff(text);
    // }
    // text.join("");
    return text;
  };

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
                    <p>
                      {post.article.length > 30
                        ? cutOff(post.article)
                        : post.article}
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
