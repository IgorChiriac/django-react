import axios from "axios";

export interface IRestaurantService {
  getRestaurants: () => Promise<any>;
  getRestaurantDetail: (restaurantId: string) => Promise<any>;
  getRestaurantReviews: (restaurantId: string) => Promise<any>;
}

const UserService: IRestaurantService = {
  getRestaurants(): Promise<any>{
    return axios.get('/api/v1/restaurants/?ordering=-reviews_avg')
  },

  getRestaurantDetail(restaurantId): Promise<any> {
    return axios.get(`/api/v1/restaurants/detail/${restaurantId}/`);
  },
  getRestaurantReviews(restaurantId): Promise<any> {
    return axios.get(`/api/v1/restaurants/${restaurantId}/reviews`);
  },
};

export default UserService;
