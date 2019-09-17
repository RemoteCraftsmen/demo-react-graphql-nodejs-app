import gql from "graphql-tag";

export const DELETE_TODO_MUTATION = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

export const UPDATE_TODO_MUTATION = gql`
  mutation updateTodo($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      completed
    }
  }
`;

export const ADD_TODO_MUTATION = gql`
  mutation createTodo($description: String!) {
    createTodo(description: $description) {
      id
      description
      completed
    }
  }
`;

export const GET_TODOS_QUERY = gql`
  query TodosQuery {
    userTodos {
      id
      description
      completed
    }
  }
`;
