import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/navbar/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Category from './components/pages/Category'
import NotFound from './components/pages/NotFound'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import AddCategory from "./components/categories/AddCategory";
import EditCategory from "./components/categories/EditCategory";
import AddBook from "./components/books/AddBook";
import EditBook from "./components/books/EditBook";
import DetailsBook from "./components/books/DetailsBook";

const App=()=>{
  return (
    <Router>
        <div className="App">
            <Navbar/>

            <Switch>
               <Route exact path="/" component={Home}/>
               <Route exact path="/about" component={About}/>
               <Route exact path="/category" component={Category}/>
               <Route exact path="/category/add" component={AddCategory}/>
               <Route exact path="/category/edit/:id" component={EditCategory}/>
               <Route exact path="/books/add" component={AddBook}/>
               <Route exact path="/books/:id" component={DetailsBook}/>
               <Route exact path="/books/edit/:id" component={EditBook}/>
               <Route component={NotFound}/>
            </Switch>
        
        </div>
    </Router>
  );
}

export default App;
