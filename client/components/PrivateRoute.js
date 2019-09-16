import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import { IS_LOGGED_IN_QUERY } from "../utils/UserRequests";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Query query={IS_LOGGED_IN_QUERY} fetchPolicy="network-only">
    {({ loading, error, data }) => {
      if (loading) {
        return <div>Fetching</div>;
      } else {
        return (
          <Route
            {...rest}
            render={props =>
              !data.me || data.me === null ? (
                <Redirect
                  to={{
                    pathname: "/"
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
