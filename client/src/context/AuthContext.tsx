import React, { useState, useEffect } from "react";
import userService, { IUser } from "../services/userService";
import AuthenticationService from "../services/authentification";

const AuthContext = React.createContext({} as any);
interface IUserState {
  isLoggedIn: boolean;
  user: null | IUser;
}

function AuthProviderWrapper(props: any) {
  const [appState, setAppState] = useState<IUserState>({
    isLoggedIn: AuthenticationService.isUserLoggedIn(),
    user: null,
  });

  const loadCurrentUser = () => {
    userService
      .getCurrentUser()
      .then((response) => {
        setAppState({ isLoggedIn: true, user: response.data });
      })
      .catch((err) => {
        setAppState({ isLoggedIn: false, user: null });
      });
  };

  useEffect(() => {
    if (AuthenticationService.isUserLoggedIn() && !appState.user) {
      setAppState({ isLoggedIn: true, user: null });
      loadCurrentUser();
    }
  }, [appState.user]);

  const logInUser = (token: string) => {
    AuthenticationService.setUserToken(token);
    loadCurrentUser();
  };

  const logOutUser = () => {
    AuthenticationService.removeUserToken();
    setAppState({ ...appState, isLoggedIn: false, user: null });
  };

  const setLoggedUser = (user: IUser, token: string) => {
    AuthenticationService.setUserToken(token);
    setAppState({ ...appState, isLoggedIn: true, user });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: appState.isLoggedIn,
        currentUser: appState.user,
        logOutUser,
        setLoggedUser,
        logInUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
