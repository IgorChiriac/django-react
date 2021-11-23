import axios from 'axios';
export interface IAuthenticationService {
  login: (username: string, password: string) => Promise<any>;
}


const AuthenticationService: IAuthenticationService = {
  login(username, password): Promise<any>{
    return axios.post('/api/v1/token/', {
      username: username,
      password: password,
    });
  },
}

export default AuthenticationService;