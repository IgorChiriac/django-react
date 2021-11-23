import axios from 'axios';

export interface IUserService{
  getCurrentUser: () => Promise<any>;
  createUser: (data: ICreateUser) => Promise<any>;
}

interface ICreateUser {
  username: string;
  password: string;
}


const UserService: IUserService = {
  getCurrentUser(): Promise<any>{
    return axios.get('/api/v1/users/me/', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}` 
      }})
  },

  createUser(data: ICreateUser): Promise<any>{
    return axios.post('/api/v1/users/', data)
  }
}

export default UserService;