import React, { lazy, Suspense } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// components
// import Layout from "./Layout";
// import Themes from "../themes/default"
// import Themes from "../themes";
// pages
import Error from "../pages/error";

export default function App() {
  // var { isAuthenticated } = useUserState();
  var isAuthenticated = true;
  return (
    <HashRouter>
      <Suspense fallback={() => null}>
        <Switch>
          <Route
            exact
            path='/'
            render={() => <Redirect to='/app/dashboard' />}
          />
          <PublicRoute
            exact
            path='/'
            render={() => <Redirect to='/app/dashboard' />}
          />
          <PrivateRoute
            path='/app'
            component={lazy(() => import("./Layout"))}

            // component={Layout}
          />{" "}
          {/* <PublicRoute path='/login' component={Login} /> */}
          <Route component={Error} />
        </Switch>{" "}
      </Suspense>
    </HashRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
