import React, { useState } from 'react';
import AuthenticationService from '../services/authentification';
import UserService from '../services/user';

const AuthContext = React.createContext({} as any);

function AuthProviderWrapper(props: any) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    const logInUser = async ({ username, password }: { username: string; password: string }) => {
        setIsLoading(true)
        try {
            await AuthenticationService.login(username, password)
            let response = await UserService.getCurrentUser()
            setUser(response.data);      
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
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
