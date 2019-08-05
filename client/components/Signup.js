import React, { Component } from "react";
import { styled } from "@material-ui/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Container,
  Button,
  TextField,
  Grid,
  Typography,
  Link,
  Avatar
} from "@material-ui/core";

const RegisterButton = styled(Button)({
  marginTop: "20px",
  marginBottom: "10px",
  paddingTop: 15,
  paddingBottom: 15
});

const Wrapper = styled(Container)({
  marginTop: "100px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
});

const LoginAvatar = styled(Avatar)({
  margin: "10px",
  backgroundColor: "#1a49a4"
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      errors: []
    };
  }

  onChange = e => {
    this.setState({ email: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <Wrapper maxWidth="xs">
        <LoginAvatar justify="center">
          <LockOutlinedIcon />
        </LoginAvatar>
        <Typography component="h1" variant="h4" align="center">
          Sign up
        </Typography>
        <form>
          <Grid style={{ marginTop: "15px" }} container spacing={2}>
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
                value={this.state.password}
                onChange={this.onChange}
              />
            </Grid>
          </Grid>
          <RegisterButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.onSumbit}
          >
            Sign up
          </RegisterButton>
        </form>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="#/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Wrapper>
    );
  }
}

export default Register;
