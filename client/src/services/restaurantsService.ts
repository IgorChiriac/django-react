import axios from 'axios';

export interface IRestaurantService{
  getRestaurants: () => Promise<any>;
}

const UserService: IRestaurantService = {
  getRestaurants(): Promise<any>{
    return axios.get('/api/v1/restaurants/?ordering=-reviews_avg', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}` 
      }})
  },
}

export default UserService;