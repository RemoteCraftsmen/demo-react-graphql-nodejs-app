import React, { Component } from "react";
import Todo from "./Todo";
import { GET_TODOS_QUERY } from "../utils/todoRequests";
import { Query } from "react-apollo";
import { List, TablePagination } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import FlipMove from "react-flip-move";

class TodoList extends Component {
  state = {
    page: 0,
    rowsPerPage: 5
  };

  handleChangePage = (e, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = e => {
    this.setState({ rowsPerPage: e.target.value, page: 0 });
  };

  render() {
    const { page, rowsPerPage } = this.state;
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
            <div>
              <List>
                <FlipMove
                  enterAnimation="fade"
                  leaveAnimation="fade"
                  appearAnimation="accordionVertical"
                >
                  {sortedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(todo => (
                      <Todo key={todo.id} todo={todo} />
                    ))}
                </FlipMove>
              </List>
              {sortedData.length > 0 && (
                <TablePagination
                  component="div"
                  rowsPerPageOptions={[5, 10, 25]}
                  count={sortedData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default TodoList;
