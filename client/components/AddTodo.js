import React, { Component } from "react";
import { Mutation } from "react-apollo";
import {
  TextField,
  InputAdornment,
  IconButton,
  Container
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddCircle from "@material-ui/icons/AddCircle";
import { ADD_TODO_MUTATION, GET_TODOS_QUERY } from "./TodoRequests";

const styles = theme => ({
  root: {
    padding: "4px 20px",
    display: "flex",
    alignItems: "center",
    height: "50px",
    width: "100%",
    margin: "50px 0"
  },
  input: {
    flex: 1
  },
  btn: {
    marginRight: "10px"
  }
});

class AddTodo extends Component {
  state = {
    description: ""
  };

  onChange = e => {
    this.setState({ description: e.target.value });
  };

  render() {
    const { description } = this.state;
    const { classes } = this.props;
    return (
      <Mutation
        mutation={ADD_TODO_MUTATION}
        variables={{ description }}
        errorPolicy="all"
        refetchQueries={() => {
          return [
            {
              query: GET_TODOS_QUERY
            }
          ];
        }}
      >
        {addTodo => (
          <Container className={classes.root}>
            <form
              className={classes.input}
              onSubmit={e => {
                e.preventDefault();
                addTodo()
                  .then(res => {
                    this.setState({
                      description: ""
                    });
                  })
                  .catch(err => {
                    console.log(err);
                  });
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
                        <AddCircle color="error" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </form>
          </Container>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(AddTodo);
