import { useState } from 'react';

const SignUp = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    return (
        <div>
            <h1>Create User</h1>
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
            <label>First Name</label>
            <input name="first_name"/>
            <br />
            <label>Last Name</label>
            <input name="last_name"/>
            <br />
            <label>Email</label>
            <input type="email" name="email"/>
            <br />
            <button type="button" onClick={() => console.log(formData)}>
                Log in
            </button>
        </div>
    );
};

export default SignUp;
