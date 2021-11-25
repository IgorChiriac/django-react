import { Route, Redirect, RouteProps } from "react-router-dom";

interface IPublicRoute extends RouteProps {
  children: any;
  isAuthenticated: boolean;
}

function PublicRoute({ children, isAuthenticated, ...rest }: IPublicRoute) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PublicRoute;
