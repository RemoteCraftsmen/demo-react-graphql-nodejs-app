import React, { Component } from "react";
import { Mutation } from "react-apollo";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Link,
  Avatar,
  FormLabel
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { LOGIN_MUTATION, IS_LOGGED_IN_QUERY } from "./UserRequests";

const styles = theme => ({
  root: {
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: "10px",
    backgroundColor: "#1a49a4"
  },
  form: {
    marginTop: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5)
  }
});

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: []
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const { email, password } = this.state;
    return (
      <Container maxWidth="xs" className={classes.root}>
        <Avatar justify="center" className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" align="center">
          Login
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                tyoe="email"
                label="Email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="password"
                name="password"
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>{this.state.errors}</FormLabel>
            </Grid>
          </Grid>
          <Mutation
            mutation={LOGIN_MUTATION}
            variables={{ email, password }}
            errorPolicy="all"
            refetchQueries={() => {
              return [
                {
                  query: IS_LOGGED_IN_QUERY
                }
              ];
            }}
          >
            {mutation => (
              <Button
                className={classes.button}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={e => {
                  e.preventDefault();
                  mutation()
                    .then(res => {
                      this.props.history.push("/dashboard");
                    })
                    .catch(err => {
                      this.setState({
                        errors: err.message.replace("GraphQL error:", "").trim()
                      });
                    });
                }}
              >
                SIGN IN
              </Button>
            )}
          </Mutation>
        </form>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/signup" variant="body2">
              Don't have an account? Sign up
            </Link>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(Login);
