import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/Register";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home/Home";
import UserPage from "./pages/UserPage";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import RestaurantDetail from "./pages/RestaurantDetail/RestaurantDetail";
import EditUserPage from "./pages/EditUserPage";
import RestaurantsPage from "./pages/RestaurantsPage";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" isAuthenticated={isLoggedIn}>
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/restaurant/:id" isAuthenticated={isLoggedIn}>
            <RestaurantDetail />
          </PrivateRoute>
          <PublicRoute path="/login" isAuthenticated={isLoggedIn}>
            <LoginPage />
          </PublicRoute>
          <PublicRoute path="/signup" isAuthenticated={isLoggedIn}>
            <SignUp />
          </PublicRoute>
          <PrivateRoute exact path="/users" isAuthenticated={isLoggedIn}>
            <UserPage />
          </PrivateRoute>
          <PrivateRoute path="/users/:id" isAuthenticated={isLoggedIn}>
            <EditUserPage />
          </PrivateRoute>
          <PrivateRoute exact path="/restaurants" isAuthenticated={isLoggedIn}>
            <RestaurantsPage />
          </PrivateRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
