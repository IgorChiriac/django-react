import * as React from "react";
import Container from "@mui/material/Container";
import RestaurantsService from "../../services/restaurantsService";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import RestaurantCard from "../../components/RestaurantCard";
import ApplicationBar from "../../components/ApplicationBar";
import ReviewCard from "../../components/ReviewCard";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import NewReview from "../../components/NewReview";

const RestaurantDetail = () => {
  const params: any = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getRestaurantDetail();
  }, []);

  const getRestaurantDetail = () => {
    RestaurantsService.getRestaurantDetail(params.id).then((res) => {
      setRestaurant(res.data);
      setReviews(res.data.reviews_summary);
    });
  };

  return (
    <>
      {restaurant && (
        <>
          <ApplicationBar />
          <Container component="main" maxWidth="md" sx={{ backgroundColor: "white", padding: "20px" }}>
            <RestaurantCard restaurant={restaurant} isDetailView />
            <Typography gutterBottom variant="h5" component="div" marginTop={3}>
              Reviews
            </Typography>
            <Typography gutterBottom variant="h6" component="div" marginTop={3}>
              Most relevant reviews
            </Typography>
            <Grid container spacing={2} xs={12} marginTop={2} marginBottom={3} alignItems="center" justifyContent="center">
              {reviews &&
                reviews.length &&
                reviews.map((review) => (
                  <Grid item xs={12} sm={4} md={3}>
                    <ReviewCard review={review} />
                  </Grid>
                ))}
            </Grid>
            <NewReview restaurantId={params.id} refresh={getRestaurantDetail} />
          </Container>
        </>
      )}
    </>
  );
};

export default RestaurantDetail;
