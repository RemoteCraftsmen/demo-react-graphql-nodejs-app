import React, { Component } from "react";
import Todo from "./Todo";
import { GET_TODOS_QUERY } from "../utils/todoRequests";
import { Query } from "react-apollo";
import { List } from "@material-ui/core";

class TodoList extends Component {
  render() {
    return (
      <Query query={GET_TODOS_QUERY} fetchPolicy="network-only">
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
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
  }
}

export default TodoList;
