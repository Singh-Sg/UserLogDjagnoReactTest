import React, { Component } from 'react';
import {BrowserRouter as Router,  Switch,Route } from 'react-router-dom';
import Login from './component/Home/login.js';
import Home from './component/Home/home.js';




class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <Switch>
           <Route path="/home" component={Home}/>
           <Route path="/" component={Login}/> 
        </Switch>
      </Router>

      </div>
     );
  }
}

export default App;


          // { (localStorage.getItem('access_token'))
          // ? <Route exact path="/home" component={Home}/>
          // : <Route exact path="/" component={Login}/> 
          // }