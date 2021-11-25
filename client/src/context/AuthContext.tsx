import React, { useState, useEffect } from 'react';
import UserService, { IUser } from '../services/user';

const AuthContext = React.createContext({} as any);
interface IUserState {
    isLoggedIn: boolean;
    user: null | IUser;
}

function AuthProviderWrapper(props: any) {
    const [appState, setAppState] = useState<IUserState>({
        isLoggedIn: false,
        user: null,
    });

    useEffect(() => {
        const authToken = sessionStorage.getItem('authToken');
        console.log(authToken)
        if (authToken && !appState.user) {
            setAppState({ isLoggedIn: true, user: null });
            UserService.getCurrentUser()
                .then((response) => {
                    setAppState({ isLoggedIn: true, user: response.data });
                })
                .catch((err) => {
                    setAppState({ isLoggedIn: false, user: null });
                });
        }
    }, [appState.user]);

    const setAccessToken = (token: string) => {
        setAppState({ ...appState, isLoggedIn: true });
        sessionStorage.setItem('authToken', token);
    }

    const logOutUser = () => {
        sessionStorage.removeItem('authToken');
        setAppState({ ...appState, isLoggedIn: false, user: null });
    };

    const setLoggedUser = (user: IUser, token: string) => {
        sessionStorage.setItem('authToken', token);
        setAppState({ ...appState, isLoggedIn: true, user });
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: appState.isLoggedIn,
                currentUser: appState.user,
                logOutUser,
                setLoggedUser,
                setAccessToken,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthProviderWrapper, AuthContext };
