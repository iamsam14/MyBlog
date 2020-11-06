import React from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";

const Home = ({ history }) => {
  return (
    <>
      <NavigationBar history={history} />
      <h3 className="home-head">
        Welcome to my food blog! <br />
        Feel free to add your own recipes to our collection!
      </h3>
      <h4 className="home-intro">
        In this food blog you can add your own recipes as well as browse through
        other recipes
      </h4>
      <div className="home-buttons">
        <Link to="/create" target="_blank" rel="noopener noreferrer">
          <button className="create-button">Create Post</button>
        </Link>
        <Link to="/articles" target="_blank" rel="noopener noreferrer">
          <button className="view-button">View Posts</button>
        </Link>
      </div>
    </>
  );
};

export default Home;
