import React, { Component } from "react";
import Todo from "./Todo";
import { Query } from "react-apollo";
import { List } from "@material-ui/core";
import { GET_TODOS_QUERY } from "./TodoRequests";

class TodoList extends Component {
  render() {
    return (
      <Query query={GET_TODOS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) console.log(error);
          return (
            <List styles={{ width: "100%" }}>
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
