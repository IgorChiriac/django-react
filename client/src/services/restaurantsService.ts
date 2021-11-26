import axios from "axios";
export const SESSION_AUTH_NAME = "authToken";

export interface IRestaurantService {
  getRestaurants: () => Promise<any>;
  getRestaurantDetail: (restaurantId: string) => Promise<any>;
  getRestaurantReviews: (restaurantId: string) => Promise<any>;
  createReview: (
    restaurantId: string,
    {
      num_stars,
      comment,
      visit_date
    }: {comment: string;
      num_stars: number;
      visit_date: string;
    }
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
  createReview(restaurantId, {num_stars, comment, visit_date}): Promise<any> {
    return axios.post(`/api/v1/restaurants/${restaurantId}/reviews`, {
      comment: comment,
      num_stars: num_stars,
      visit_date: visit_date,
      restaurant: restaurantId,
    });
  },
};

export default userService;
