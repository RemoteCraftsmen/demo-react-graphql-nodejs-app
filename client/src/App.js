import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import "../index.css";

const App = () => (
  <Switch>
    <PrivateRoute exact path="/" component={Dashboard} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/login" component={Login} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
  </Switch>
);

export default App;
