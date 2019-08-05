import React, { Component } from "react";

class Todo extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.todo.description} ({this.props.todo.completed})
        </div>
      </div>
    );
  }
}

export default Todo;
