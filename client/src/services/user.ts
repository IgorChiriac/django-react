import axios from 'axios';

export interface IUser {
  username: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
}
export interface IUserService{
  getCurrentUser: () => Promise<{data: IUser}>;
  getUserList: (page: number) => Promise<{data: IUser[]}>;
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
  },

  getUserList(page: number): Promise<any>{
    return axios.get(`/api/v1/users/?page=${page + 1}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}` 
      }})
  },
}

export default UserService;