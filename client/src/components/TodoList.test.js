import React from "react";
import wait from "waait";
import { mount } from "../../enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import TodoList from "./TodoList";
import { GET_TODOS_QUERY } from "../utils/todoRequests";
import { Container } from "@material-ui/core";

it("should render without error", () => {
  mount(
    <MockedProvider mocks={[]}>
      <TodoList />
    </MockedProvider>
  );
});

it("should render loading state initially", () => {
  const component = mount(
    <MockedProvider mocks={[]}>
      <TodoList />
    </MockedProvider>
  );

  expect(component.find("div").text()).toEqual("Loading...");
});

/* it("should return todos", async () => {
  let getTodos = false;
  const mock = {
    request: {
      query: GET_TODOS_QUERY,
      variables: {}
    },
    result: {
      data: {
        userTodos: [
          {
            id: 1,
            description: "name",
            completed: false
          }
        ]
      }
    }
  };
  const component = mount(
    <MockedProvider mocks={[mock]} removeTypename>
      <TodoList />
    </MockedProvider>
  );

  await wait(0);

  component.update();
  expect(getTodos).toBe(true);
}); */
