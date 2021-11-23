import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { logInUser, isLoading, user, logOutUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({ username: '', password: '' });
    return (
        <div>
            <h1>Login</h1>
            {isLoading && 'Loading'}
            {user ? (
                <div>
                    <span>Current user is: {user?.username}</span>
                    <br />
                    <button onClick={() => logOutUser()}>Log out </button>
                </div>
            ) : (
                <div>
                  <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />{' '}
                    <br />
                    <label>Password</label>
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
        </div>
    );
};

export default Login;
