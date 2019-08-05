import React, { Component } from "react";
import Todo from "./Todo";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const TODO_QUERY = gql`
  {
    todos {
      id
      description
      completed
    }
  }
`;

class TodoList extends Component {
  render() {
    return (
      <Query query={TODO_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          const todos = data.todos;

          return (
            <div>
              {todos.map(todo => (
                <Todo key={todo.id} todo={todo} />
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default TodoList;
