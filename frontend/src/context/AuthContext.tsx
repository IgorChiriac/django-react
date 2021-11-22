import React, { useState } from 'react';
import axios from 'axios';

const AuthContext = React.createContext({} as any);

function AuthProviderWrapper(props: any) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    const logInUser = async ({ username, password }: { username: string; password: string }) => {
        try {
            await axios.post('/api/v1/token/', {
                username: username,
                password: password,
            });
            let response = await axios.get('/api/v1/users/me/');
            setUser(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const logOutUser = () => {
        sessionStorage.removeItem('authToken');
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, logInUser, logOutUser }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthProviderWrapper, AuthContext };
