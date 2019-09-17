import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import AddTodo from "../components/AddTodo";
import AppBar from "../components/AppBar";
import TodoList from "../components/TodoList";

const styles = makeStyles(theme => ({
  root: {
    alignItems: "center"
  }
}));

const Dashboard = () => {
  const classes = styles();
  return (
    <React.Fragment>
      <AppBar />
      <Container maxWidth="lg" className={classes.root}>
        <AddTodo />
        <TodoList />
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
