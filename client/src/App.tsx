import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
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
            <Login />
          </PublicRoute>
          <PublicRoute
            path="/signup"
            isAuthenticated={isLoggedIn}
          >
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
