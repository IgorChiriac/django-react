import axios from "axios";
export const SESSION_AUTH_NAME = "authToken";

export interface IRestaurantService {
  getRestaurants: () => Promise<any>;
  getRestaurantDetail: (restaurantId: string) => Promise<any>;
  getRestaurantReviews: (restaurantId: string) => Promise<any>;
  setReview: (
    restaurantId: string,
    reviewScore: Number,
    comment: string
  ) => Promise<any>;
}

const userService: IRestaurantService = {
  getRestaurants(): Promise<any> {
    return axios.get("/api/v1/restaurants/?ordering=-reviews_avg");
  },

  getRestaurantDetail(restaurantId): Promise<any> {
    return axios.get(`/api/v1/restaurants/detail/${restaurantId}/`);
  },
  getRestaurantReviews(restaurantId): Promise<any> {
    return axios.get(`/api/v1/restaurants/${restaurantId}/reviews`);
  },
  setReview(restaurantId, reviewScore, comment): Promise<any> {
    const token = sessionStorage.getItem(SESSION_AUTH_NAME);
    return axios.post(`/api/v1/restaurants/${restaurantId}/reviews`, {
      comment: comment,
      num_stars: reviewScore,
      visit_date: new Date().toISOString(),
      restaurant: restaurantId,
    });
  },
};

export default userService;
