import React from "react";
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
    </>
  );
};

export default Home;
