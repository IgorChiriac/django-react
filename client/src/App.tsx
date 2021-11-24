import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Register";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import {useContext} from 'react'
import { AuthContext } from "./context/AuthContext";

function App() {
  const { isLoggedIn, currentUser } = useContext(AuthContext);
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" isAuthenticated={isLoggedIn}>
            <Home />
          </PrivateRoute>

          <PublicRoute
            path="/login"
            isAuthenticated={isLoggedIn}
          >
            <Login />
          </PublicRoute>
          <PublicRoute
            path="/signup"
            isAuthenticated={isLoggedIn}
          >
            <SignUp />
          </PublicRoute>
          <PublicRoute
            path="/users"
            isAuthenticated={isLoggedIn && currentUser?.is_admin}
          >
            <SignUp />
          </PublicRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
