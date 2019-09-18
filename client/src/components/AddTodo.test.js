import React from "react";
import wait from "waait";
import { mount } from "../../enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import AddTodo from "./AddTodo";
import { ADD_TODO_MUTATION } from "../utils/todoRequests";
import { GET_TODOS_QUERY } from "../utils/todoRequests";

it("should render without error", () => {
  mount(
    <MockedProvider mocks={[]}>
      <AddTodo />
    </MockedProvider>
  );
});

it("should add todo", async () => {
  let addMutationCalled = false;
  const mock = [
    {
      request: {
        query: ADD_TODO_MUTATION,
        variables: { description: "" },
        refetchQueries: [
          {
            query: GET_TODOS_QUERY
          }
        ]
      },
      result: () => {
        addMutationCalled = true;
        return {
          data: {
            createTodo: {
              id: 1,
              description: "name",
              completed: true
            }
          }
        };
      }
    }
  ];
  const component = mount(
    <MockedProvider mocks={mock} addTypename={false}>
      <AddTodo />
    </MockedProvider>
  );

  component.find("form").simulate("submit");

  await wait(0);

  expect(addMutationCalled).toBe(true);
});
