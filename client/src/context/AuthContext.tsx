import React, { useState, useEffect } from 'react';
import AuthenticationService from '../services/authentification';
import UserService, { IUser } from '../services/user';

const AuthContext = React.createContext({} as any);
interface IUserState {
    loading: boolean;
    isLoggedIn: boolean;
    user: null | IUser;
}

function AuthProviderWrapper(props: any) {
    const [appState, setAppState] = useState<IUserState>({
        loading: false,
        isLoggedIn: false,
        user: null,
    });

    useEffect(() => {
        const authToken = sessionStorage.getItem('authToken');
        if (authToken && !appState.user) {
            UserService.getCurrentUser().then((response) => {
                setAppState({ loading: false, isLoggedIn: true, user: response.data });
            });
        }
    }, []);

    const logInUser = async ({ username, password }: { username: string; password: string }) => {
        setAppState({ ...appState, loading: true });
        try {
            const token = await AuthenticationService.login(username, password);
            sessionStorage.setItem('authToken', token.data.access);
            let response = await UserService.getCurrentUser();
            setAppState({ loading: false, isLoggedIn: true, user: response.data });
        } catch (error) {
            setAppState({ ...appState, loading: false});
        }
    };

    const logOutUser = () => {
        sessionStorage.removeItem('authToken');
        setAppState({ ...appState, loading: false, isLoggedIn: false, user: null });
    };

    const setLoggedUser = (user: IUser, token: string) => {
        sessionStorage.setItem('authToken', token);
        setAppState({ ...appState, isLoggedIn: true, user });
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: appState.isLoggedIn,
                isLoading: appState.loading,
                currentUser: appState.user,
                logInUser,
                logOutUser,
                setLoggedUser,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthProviderWrapper, AuthContext };
