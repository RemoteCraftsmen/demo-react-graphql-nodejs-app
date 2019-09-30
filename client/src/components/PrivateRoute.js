import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import { IS_LOGGED_IN_QUERY } from "../utils/userRequests";
import CircularProgress from "@material-ui/core/CircularProgress";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Query query={IS_LOGGED_IN_QUERY} fetchPolicy="network-only">
    {({ loading, error, data }) => {
      if (loading)
        return (
          <div style={{ width: "100%", textAlign: "center" }}>
            <CircularProgress
              style={{ margin: "50px", display: "inline-block" }}
            />
          </div>
        );
      else {
        return (
          <Route
            {...rest}
            render={props =>
              !data.me || data.me === null ? (
                <Redirect
                  to={{
                    pathname: "/login"
                  }}
                />
              ) : (
                <Component {...props} />
              )
            }
          />
        );
      }
    }}
  </Query>
);

export default PrivateRoute;
