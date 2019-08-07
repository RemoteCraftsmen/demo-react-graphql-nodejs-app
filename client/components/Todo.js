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
import { GET_TODOS_QUERY } from "./TodoList";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      completed
    }
  }
`;

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
            mutation={UPDATE_TODO}
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
            mutation={DELETE_TODO}
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
