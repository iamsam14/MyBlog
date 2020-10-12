import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import EditArticle from "./Components/EditArticle";
import CreateArticle from "./Components/CreateArticle";
import CreateUser from "./Components/CreateUser";
import Articles from "./Components/Articles";
import ViewArticle from "./Components/ViewArticle";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Route path="/edit/:id" component={EditArticle} />
        <Route path="/create" component={CreateArticle} />
        <Route path="/user" component={CreateUser} />
        <Route path="/" component={Articles} />
        <Route path="/article/:id" component={ViewArticle} />
      </Router>
    </div>
  );
}

export default App;
