import axios from "axios";

export interface IUser {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_admin: boolean;
}
export interface IUserService {
  getCurrentUser: () => Promise<{ data: IUser }>;
  getUserById: (id: string) => Promise<{ data: IUser }>;
  createUser: (data: ICreateUser) => Promise<any>;
  updateUser: (data: IUser) => Promise<any>;
  deleteUserById: (id: string) => Promise<any>;
  getUserList: (page: number) => Promise<{ data: IUser[] }>;
}

interface ICreateUser {
  username: string;
  password: string;
}

const userService: IUserService = {
  getCurrentUser(): Promise<any> {
    return axios.get("/api/v1/users/me/");
  },

  createUser(data: ICreateUser): Promise<any> {
    return axios.post("/api/v1/users/", data);
  },

  getUserById(id: string): Promise<{ data: IUser }> {
    return axios.get(`/api/v1/users/${id}/`);
  },

  updateUser(data: IUser): Promise<any> {
    const { id, ...user } = data;
    return axios.patch(`/api/v1/users/${id}/`, user);
  },

  getUserList(page: number): Promise<{ data: IUser[] }> {
    return axios.get(`/api/v1/users/?page=${page + 1}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
  },

  deleteUserById(id: string): Promise<{ data: IUser }> {
    return axios.delete(`/api/v1/users/${id}/`);
  },
};

export default userService;
