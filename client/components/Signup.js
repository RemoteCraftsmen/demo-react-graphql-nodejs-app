import React, { Component } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { withStyles } from "@material-ui/core/styles";
import {
  Container,
  Button,
  TextField,
  Grid,
  Typography,
  Link,
  Avatar
} from "@material-ui/core";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const styles = theme => ({
  root: {
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    marginTop: theme.spacing(2)
  },
  avatar: {
    margin: "10px",
    backgroundColor: "#1a49a4"
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5)
  }
});

const SIGNUP_MUTATION = gql`
  mutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signUp(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      id
    }
  }
`;

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

  render() {
    const { classes } = this.props;
    const { email, password, firstName, lastName } = this.state;
    return (
      <Container maxWidth="xs" className={classes.root}>
        <Avatar justify="center" className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" align="center">
          Sign up
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
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
                autoComplete="lname"
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
          </Grid>
          <Mutation
            mutation={SIGNUP_MUTATION}
            variables={{ email, password, firstName, lastName }}
            errorPolicy="all"

            //onCompleted={this.onSubmit}
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
                  mutation().then(res => {
                    if (!res.errors) {
                      this.props.history.push("/login");
                    } else {
                      this.setState({ errors: res.errors });
                      console.log(this.errors);
                    }
                  });
                }}
              >
                Sign up
              </Button>
            )}
          </Mutation>
        </form>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(Register);
