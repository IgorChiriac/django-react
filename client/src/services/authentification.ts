import axios, { AxiosRequestConfig } from 'axios';

export const SESSION_AUTH_NAME = 'authToken';
export interface IAuthenticationService {
    login: (username: string, password: string) => Promise<any>;
    setupAxiosInterceptors: () => void;
    setUserToken: (token: string) => void;
    removeUserToken: () => void;
    isUserLoggedIn: () => boolean;
}

const AuthenticationService: IAuthenticationService = {
    login(username, password): Promise<any> {
        return axios.post('/api/v1/token/', {
            username: username,
            password: password,
        });
    },

    setUserToken(token) {
        sessionStorage.setItem(SESSION_AUTH_NAME, token);
        this.setupAxiosInterceptors();
    },

    removeUserToken() {
        sessionStorage.removeItem(SESSION_AUTH_NAME);
    },

    isUserLoggedIn() {
        let token = sessionStorage.getItem(SESSION_AUTH_NAME);
        if (token === null) return false;
        return true;
    },

    setupAxiosInterceptors() {
      const token = sessionStorage.getItem(SESSION_AUTH_NAME);
        axios.interceptors.request.use((config: AxiosRequestConfig) => {
            if (config && config.headers && this.isUserLoggedIn()) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
            return config;
        });
    },
};

export default AuthenticationService;
