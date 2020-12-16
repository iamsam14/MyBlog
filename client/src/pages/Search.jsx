import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "../Components/HomeNav";

const Search = () => {
  const [queryTitle, setQueryTitle] = useState({});
  const [queriedPosts, setQueriedPosts] = useState(null);

  useEffect(() => {
    axios
      .post("/search/api/posts/", queryTitle)
      .then((res) => {
        setQueriedPosts(res.data);
      })
      .catch((error) => console.log(error));
  }, [queryTitle]);

  const handleSearch = async (event) => {
    event.preventDefault();
    let recipeTitle = event.target.value;
    setQueryTitle({ title: recipeTitle });
  };

  return (
    <>
      <NavigationBar />
      <h1 style={{ marginTop: "2rem" }}>Search</h1>
      <input
        id="title"
        name="title"
        type="text"
        name="recipes"
        onChange={handleSearch}
      />
      {queriedPosts
        ? queriedPosts.map((post) => {
            return (
              <>
                <div key={post._id}>
                  <a
                    key={post.id + "1"}
                    href={`/article/${post._id}`}
                    style={{ color: "#74121D" }}
                  >
                    <h3 key={post.id + "2"}>{post.title}</h3>
                  </a>
                  <p key={post.id + "3"}>{post.article.substring(0, 100)}...</p>
                </div>
              </>
            );
          })
        : ""}
    </>
  );
};

export default Search;
