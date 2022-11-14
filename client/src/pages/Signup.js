import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { withStyles } from "@material-ui/core/styles";
import {
  Container,
  Button,
  TextField,
  Grid,
  Typography,
  Link,
  Avatar,
  FormLabel
} from "@material-ui/core";
import { graphql } from "react-apollo";
import { SIGNUP_MUTATION } from "../utils/userRequests";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: "center"
  },
  form: {
    marginTop: theme.spacing(2)
  },
  avatar: {
    marginTop: theme.spacing(24),
    margin: "10px",
    backgroundColor: "#1a49a4"
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5)
  }
});

class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    errors: []
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const { email, password, firstName, lastName } = this.state;
    e.preventDefault();
    this.props
      .mutate({
        mutation: SIGNUP_MUTATION,
        variables: {
          email,
          password,
          firstName,
          lastName
        }
      })
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch(err => {
        this.setState({
          errors: err.message.replace("GraphQL error:", "").trim()
        });
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="xs" className={classes.root}>
        <Avatar justify="center" className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" align="center">
          Sign up
        </Typography>
        <form
          className={classes.form}
          onSubmit={e => {
            this.onSubmit(e);
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                autoComplete="firstName"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={this.state.firstName}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                value={this.state.lastName}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
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
          <Button
            className={classes.button}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign up
          </Button>
        </form>
        <Grid container justify="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default graphql(SIGNUP_MUTATION)(withStyles(styles)(Register));
