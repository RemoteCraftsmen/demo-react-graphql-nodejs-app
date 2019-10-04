import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListItemIcon,
  Checkbox,
  Tooltip
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { graphql } from "react-apollo";
import {
  DELETE_TODO_MUTATION,
  EDIT_TODO_MUTATION,
  UPDATE_TODO_MUTATION
} from "../utils/todoRequests";
import TodoEditDialog from "./TodoEditDialog";

class Todo extends Component {
  state = {
    open: false
  };

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

  editTodo = description => {
    this.closeEditDialog();
    this.props.mutate({
      mutation: EDIT_TODO_MUTATION,
      variables: {
        id: this.props.todo.id,
        description: description
      },
      refetchQueries: ["TodosQuery"]
    });
  };

  showEditDialog = () => {
    this.setState({ open: true });
  };

  closeEditDialog = () => {
    this.setState({ open: false });
  };

  render() {
    const { completed, description } = this.props.todo;
    return (
      <List>
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
            <Tooltip title="Edit">
              <IconButton aria-label="edit" onClick={this.showEditDialog}>
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
            <TodoEditDialog
              open={this.state.open}
              description={description}
              handleClose={this.closeEditDialog}
              handleEdit={this.editTodo}
            ></TodoEditDialog>
            <Tooltip title="Delete">
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={this.deleteTodo}
              >
                <DeleteIcon color="primary" />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  }
}

export default graphql(UPDATE_TODO_MUTATION, DELETE_TODO_MUTATION)(Todo);
