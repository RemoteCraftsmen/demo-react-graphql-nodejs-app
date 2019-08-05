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

const LoginButton = styled(Button)({
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          Login
        </Typography>
        <form>
          <Grid style={{ marginTop: "15px" }} container spacing={2}>
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
              />
            </Grid>
          </Grid>
          <LoginButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.onSumbit}
          >
            SIGN IN
          </LoginButton>
        </form>

        <Grid container justify="flex-end">
          <Grid item>
            <Link href="#/register" variant="body2">
              Dont't have an account? Sign up
            </Link>
          </Grid>
        </Grid>
      </Wrapper>
    );
  }
}

export default Login;
