import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import TodoPanel from "./TodoPanel";
import Signup from "./Signup";
import Login from "./Login";
import Navbar from "./Navbar";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={TodoPanel} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
