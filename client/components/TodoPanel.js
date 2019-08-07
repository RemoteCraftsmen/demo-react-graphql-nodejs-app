import React, { Component } from "react";
import TodoList from "./TodoList";
import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddTodo from "./AddTodo";

const styles = theme => ({
  root: {
    alignItems: "center",
    marginTop: theme.spacing(5)
  }
});

class TodoPanel extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="md" className={classes.root}>
        <AddTodo />
        <TodoList />
      </Container>
    );
  }
}

export default withStyles(styles)(TodoPanel);
