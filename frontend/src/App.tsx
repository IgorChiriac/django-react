import { useContext, useState } from 'react';
import './App.css';
import { AuthContext } from './context/AuthContext';

function App() {
    const { logInUser, isLoading, user, logOutUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({ username: '', password: '' });
    return (
        <div className="App">
            <header className="App-header">
                {isLoading && 'Loading'}
                {user ? (
                    <div>
                        <span>Current user is: {user?.username}</span>
                        <br />
                        <button onClick={() => logOutUser()}>Log out </button>
                    </div>
                ) : (
                    <div>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />{' '}
                        <br />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <br />
                        <button type="button" onClick={() => logInUser(formData)}>
                            Log in
                        </button>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
