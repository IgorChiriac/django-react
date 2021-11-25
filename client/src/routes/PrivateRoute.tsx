import { Route, Redirect, RouteProps } from "react-router-dom";

interface IPrivateRoute extends RouteProps {
  children: any;
  isAuthenticated: boolean;
}

function PrivateRoute({ children, isAuthenticated, ...rest }: IPrivateRoute) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
