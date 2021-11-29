import axios from "axios";

export interface IRestaurantService {
  getRestaurants: (page: number) => Promise<any>;
  getRestaurantsByPage: (page: number) => Promise<any>;
  createRestaurant: (data: any) => Promise<any>;
  updateRestaurant: (id:string, data: any) => Promise<any>;
  getRestaurantsById: (id: string) => Promise<any>;
  deleteRestaurantById: (id: string) => Promise<any>;
  getRestaurantsList: () => Promise<any>;
  getRestaurantDetail: (restaurantId: string) => Promise<any>;
  createReview: (
    restaurantId: string,
    {
      num_stars,
      comment,
      visit_date,
    }: { comment: string; num_stars: number; visit_date: string }
  ) => Promise<any>;
}

const RestaurantService: IRestaurantService = {
  getRestaurants(page): Promise<any> {
    return axios.get(`/api/v1/restaurants/?ordering=-reviews_avg&page=${page}`);
  },

  createRestaurant(data: any): Promise<any> {
    return axios.post("/api/v1/restaurants/", data);
  },

  updateRestaurant(id: string, data: any): Promise<any> {
    return axios.patch(`/api/v1/restaurants/${id}/`, data);
  },

  getRestaurantsList(): Promise<any> {
    return axios.get(`/api/v1/restaurants/`);
  },

  getRestaurantsByPage(page: number): Promise<any> {
    return axios.get(`/api/v1/restaurants/?page=${page}`);
  },

  getRestaurantsById(id: string): Promise<any> {
    return axios.get(`/api/v1/restaurants/${id}/`);
  },

  deleteRestaurantById(id: string): Promise<any> {
    return axios.delete(`/api/v1/restaurants/${id}/`);
  },

  getRestaurantDetail(restaurantId): Promise<any> {
    return axios.get(`/api/v1/restaurants/${restaurantId}/details/`);
  },
  createReview(restaurantId, { num_stars, comment, visit_date }): Promise<any> {
    return axios.post(`/api/v1/reviews/`, {
      comment: comment,
      num_stars: num_stars,
      visit_date: visit_date,
      restaurant: restaurantId,
    });
  },
};

export default RestaurantService;
