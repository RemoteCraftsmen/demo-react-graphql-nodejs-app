import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import App from "./src/App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
const theme = createMuiTheme();

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.REACT_APP_BACKEND_URL,
  credentials: "include"
});

const client = new ApolloClient({
  cache,
  link,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <CssBaseline />
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById("root")
);
