import axios from 'axios';

interface ICallback<T = any> {
  (data: T): void;
}

export interface IAuthenticationService {
  login: (username: string, password: string) => Promise<any>;
  logout: (callback: ICallback<string>) => void;
}


const AuthenticationService: IAuthenticationService = {
  login(username, password): Promise<any>{
    return axios.post('/api/v1/token/', {
      username: username,
      password: password,
    });
  },

  logout() {
      sessionStorage.removeItem("auth_token");
  },
}

export default AuthenticationService;