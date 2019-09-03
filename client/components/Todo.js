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
import { Mutation } from "react-apollo";
import {
  GET_TODOS_QUERY,
  DELETE_TODO_MUTATION,
  UPDATE_TODO_MUTATION
} from "./TodoRequests";

class Todo extends Component {
  render() {
    const { completed, description, id } = this.props.todo;
    return (
      <ListItem
        style={{
          textDecoration: completed ? "line-through" : "none"
        }}
        button
        dense
      >
        <ListItemIcon>
          <Mutation
            mutation={UPDATE_TODO_MUTATION}
            variables={{ id, completed: !completed }}
            errorPolicy="all"
            refetchQueries={() => {
              return [
                {
                  query: GET_TODOS_QUERY
                }
              ];
            }}
          >
            {updateTodo => (
              <Checkbox
                edge="start"
                checked={completed}
                tabIndex={-1}
                disableRipple
                inputProps={{}}
                onChange={e => {
                  e.preventDefault();
                  updateTodo().catch(err => {
                    console.log(err);
                  });
                }}
              />
            )}
          </Mutation>
        </ListItemIcon>
        <ListItemText primary={description} />
        <ListItemSecondaryAction>
          <Mutation
            mutation={DELETE_TODO_MUTATION}
            variables={{ id }}
            errorPolicy="all"
            refetchQueries={() => {
              return [
                {
                  query: GET_TODOS_QUERY
                }
              ];
            }}
          >
            {deleteTodo => (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={e => {
                  e.preventDefault();
                  deleteTodo().catch(err => {
                    console.log(err);
                  });
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Mutation>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Todo;
