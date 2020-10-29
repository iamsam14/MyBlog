import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AppContextProvider } from './Context/AppContext';
import EditArticle from "./Components/EditArticle";
import CreateArticle from "./Components/CreateArticle";
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Articles from "./Components/Articles";
import ViewArticle from "./Components/ViewArticle";
import Home from './pages/Home'
import Footer from './Components/Footer'
import './App.css'

function App() {
  return (
      <AppContextProvider>
        <Router>      
            <Route exact path='/' component={SignUp} />
            <Route path="/home" component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/articles' component={Articles} />
            <Route path="/edit/:id" component={EditArticle} />
            <Route path="/create" component={CreateArticle} />
            <Route path="/article/:id" component={ViewArticle} />
        </Router>  
        <Footer/>
      </AppContextProvider>
  );
}

export default App;
