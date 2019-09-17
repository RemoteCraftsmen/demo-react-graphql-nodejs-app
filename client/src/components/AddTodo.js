import React, { Component } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Container
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddCircle from "@material-ui/icons/AddCircle";
import { graphql } from "react-apollo";
import { ADD_TODO_MUTATION } from "../utils/todoRequests";

const styles = {
  root: {
    padding: "4px 0px",
    display: "flex",
    alignItems: "center",
    height: "50px",
    marginTop: "50px",
    marginBottom: "30px"
  },
  input: {
    flex: 1
  },
  btn: {
    marginRight: "10px"
  }
};

class AddTodo extends Component {
  state = {
    description: ""
  };

  onChange = e => {
    this.setState({ description: e.target.value });
  };

  addTodo = e => {
    e.preventDefault();
    this.props
      .mutate({
        mutation: ADD_TODO_MUTATION,
        variables: {
          description: this.state.description
        },
        refetchQueries: ["TodosQuery"]
      })
      .then(() => {
        this.setState({
          description: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { description } = this.state;
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
        <form
          className={classes.input}
          onSubmit={e => {
            this.addTodo(e);
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            name="input"
            label="Task"
            autoFocus
            required
            placeholder="Something to do.."
            value={description}
            onChange={this.onChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" className={classes.btn}>
                  <IconButton edge="end" type="submit">
                    <AddCircle color="primary" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>
      </Container>
    );
  }
}

export default graphql(ADD_TODO_MUTATION)(withStyles(styles)(AddTodo));
