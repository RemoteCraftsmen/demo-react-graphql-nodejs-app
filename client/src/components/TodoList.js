import React from "react";
import Todo from "./Todo";
import { GET_TODOS_QUERY } from "../utils/todoRequests";
import { Query } from "react-apollo";
import { List } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const TodoList = () => (
  <Query query={GET_TODOS_QUERY} fetchPolicy="network-only">
    {({ loading, error, data }) => {
      if (loading)
        return (
          <div style={{ width: "100%", textAlign: "center" }}>
            <CircularProgress
              style={{ margin: "50px", display: "inline-block" }}
            />
          </div>
        );
      if (error) console.log(error);
      return (
        <List>
          {data.userTodos.map(todo => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </List>
      );
    }}
  </Query>
);

export default TodoList;
