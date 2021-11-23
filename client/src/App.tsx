import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <div>
                        <ul>
                            <li>
                                <Link to={'/'}>Home</Link>
                            </li>
                            <li>
                                <Link to={'/login'}>Login</Link>
                            </li>
                            <li>
                                <Link to={'/signup'}>Signup</Link>
                            </li>
                        </ul>
                    </div>
                </header>
                <Switch>
                    <Route exact path="/" component={Home} />

                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
