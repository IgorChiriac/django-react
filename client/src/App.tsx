import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/Register";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import {useContext} from 'react'
import { AuthContext } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <PublicRoute
            path="/login"
            isAuthenticated={isLoggedIn}
          >
            <LoginPage />
          </PublicRoute>
          <PublicRoute path="/signup" isAuthenticated={isLoggedIn}>
            <SignUp />
          </PublicRoute>
          <PrivateRoute
            path="/users"
            isAuthenticated={isLoggedIn}
          >
            <UserPage />
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
