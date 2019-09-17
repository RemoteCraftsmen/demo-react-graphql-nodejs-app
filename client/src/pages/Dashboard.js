import React, { Component } from "react";
import TodoList from "../components/TodoList";
import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddTodo from "../components/AddTodo";
import AppBar from "../components/AppBar";

const styles = theme => ({
  root: {
    alignItems: "center"
  }
});

class TodoPanel extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <AppBar />
        <Container maxWidth="lg" className={classes.root}>
          <AddTodo />
          <TodoList />
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TodoPanel);
