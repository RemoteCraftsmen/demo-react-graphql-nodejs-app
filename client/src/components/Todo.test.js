import React from "react";
import wait from "waait";
import { mount } from "../../enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import { ListItem } from "@material-ui/core";
import Todo from "./Todo";
import {
  DELETE_TODO_MUTATION,
  UPDATE_TODO_MUTATION,
  GET_TODOS_QUERY
} from "../utils/todoRequests";

const todo = [{ id: 1, description: "asd", completed: false }];

describe("<Todo />", () => {
  it("should render without error", () => {
    mount(
      <MockedProvider mocks={[]}>
        <Todo todo={todo} />
      </MockedProvider>
    );
  });

  it("should delete todo", async () => {
    let deleteMutationCalled = false;
    const mock = [
      {
        request: {
          query: DELETE_TODO_MUTATION,
          variables: {},
          refetchQueries: [
            {
              query: GET_TODOS_QUERY
            }
          ]
        },
        result: () => {
          deleteMutationCalled = true;
          return {
            data: {
              deleteTodo: {
                id: 1
              }
            }
          };
        }
      }
    ];
    const component = mount(
      <MockedProvider mocks={mock} addTypename={false}>
        <Todo todo={todo} />
      </MockedProvider>
    );
    const button = component.find("button");
    expect(button).toHaveLength(1);
    button.simulate("click");

    await wait(0);

    expect(deleteMutationCalled).toBe(true);
  });

  it("should update todo and checkbox", async () => {
    let updateMutationCalled = false;
    const mock = [
      {
        request: {
          query: UPDATE_TODO_MUTATION,
          variables: { completed: true },
          refetchQueries: [
            {
              query: GET_TODOS_QUERY
            }
          ]
        },
        result: () => {
          updateMutationCalled = true;
          return {
            data: {
              updateTodo: {
                id: 1,
                completed: true
              }
            }
          };
        }
      }
    ];
    const component = mount(
      <MockedProvider mocks={mock} addTypename={false}>
        <Todo todo={todo} />
      </MockedProvider>
    );

    const button = component.find(ListItem);
    expect(button).toHaveLength(1);
    button.props().onClick({ preventDefault: () => {} });

    await wait(0);

    expect(updateMutationCalled).toBe(true);
  });
});
