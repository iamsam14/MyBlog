import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "../Components/HomeNav";

const Search = () => {
  const [recipes, setRecipes] = useState(null);

  const handleSearch = (e) => {
    axios.get("/api/posts");
  };
  return (
    <>
      <NavigationBar />
      <h1>Search</h1>
      <input type="text" name="recipes" onChange={handleSearch} />
    </>
  );
};

export default Search;
