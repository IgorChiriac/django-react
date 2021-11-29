import axios from "axios";

export interface IReviewService {
  getReviewsByPage: (page: number) => Promise<any>;
  getReviewsList: () => Promise<any>;
  deleteReview: (id: string) => Promise<any>;
}

const ReviewService: IReviewService = {
  getReviewsList(): Promise<any> {
    return axios.get(`/api/v1/reviews/?ordering=-created_at`);
  },
  getReviewsByPage(page): Promise<any> {
    return axios.get(`/api/v1/reviews/?page=${page}&ordering=-created_at`);
  },
  deleteReview(id: string): Promise<any> {
    return axios.delete(`/api/v1/reviews/${id}/`);
  }
};

export default ReviewService;
