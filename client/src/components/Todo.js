import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListItemIcon,
  Checkbox
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { graphql } from "react-apollo";
import {
  DELETE_TODO_MUTATION,
  UPDATE_TODO_MUTATION
} from "../utils/todoRequests";

class Todo extends Component {
  updateTodo = e => {
    e.preventDefault();
    this.props.mutate({
      mutation: UPDATE_TODO_MUTATION,
      variables: {
        id: this.props.todo.id,
        completed: !this.props.todo.completed
      },
      refetchQueries: ["TodosQuery"]
    });
  };

  deleteTodo = e => {
    e.preventDefault();
    this.props.mutate({
      mutation: DELETE_TODO_MUTATION,
      variables: {
        id: this.props.todo.id
      },
      refetchQueries: ["TodosQuery"]
    });
  };

  render() {
    const { completed, description } = this.props.todo;
    return (
      <ListItem
        style={{
          textDecoration: completed ? "line-through" : "none"
        }}
        button
        dense
        onClick={this.updateTodo}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            color="primary"
            checked={completed}
            tabIndex={-1}
            disableRipple
            onChange={this.updateTodo}
          />
        </ListItemIcon>
        <ListItemText primary={description} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={this.deleteTodo}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default graphql(UPDATE_TODO_MUTATION, DELETE_TODO_MUTATION)(Todo);
