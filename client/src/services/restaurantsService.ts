import axios from "axios";
export const SESSION_AUTH_NAME = "authToken";

export interface IRestaurantService {
  getRestaurants: (page: number) => Promise<any>;
  getRestaurantsByPage: (page: number) => Promise<any>;
  getRestaurantsList: () => Promise<any>;
  getRestaurantDetail: (restaurantId: string) => Promise<any>;
  getRestaurantReviews: (restaurantId: string) => Promise<any>;
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

  getRestaurantsList(): Promise<any> {
    return axios.get(`/api/v1/restaurants/`);
  },

  getRestaurantsByPage(page: number): Promise<any> {
    return axios.get(`/api/v1/restaurants/?page=${page}`);
  },

  getRestaurantDetail(restaurantId): Promise<any> {
    return axios.get(`/api/v1/restaurants/${restaurantId}/details`);
  },
  getRestaurantReviews(restaurantId): Promise<any> {
    return axios.get(`/api/v1/restaurants/${restaurantId}/reviews`);
  },
  createReview(restaurantId, { num_stars, comment, visit_date }): Promise<any> {
    return axios.post(`/api/v1/restaurants/${restaurantId}/reviews`, {
      comment: comment,
      num_stars: num_stars,
      visit_date: visit_date,
      restaurant: restaurantId,
    });
  },
};

export default RestaurantService;
