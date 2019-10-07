import React, { Component } from "react";
import Todo from "./Todo";
import { GET_TODOS_QUERY } from "../utils/todoRequests";
import { Query } from "react-apollo";
import { List } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import FlipMove from "react-flip-move";

class TodoList extends Component {
  render() {
    return (
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
          const sortedData = data.userTodos.sort(
            (a, b) =>
              a.completed - b.completed ||
              ((a.completed === true && b.updatedAt - a.updatedAt) ||
                (a.completed === false && b.createdAt - a.createdAt))
          );
          return (
            <List>
              <FlipMove
                enterAnimation="fade"
                leaveAnimation="fade"
                appearAnimation="accordionVertical"
              >
                {sortedData.map(todo => (
                  <Todo key={todo.id} todo={todo} />
                ))}
              </FlipMove>
            </List>
          );
        }}
      </Query>
    );
  }
}

export default TodoList;
