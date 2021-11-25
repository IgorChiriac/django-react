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

const RestaurantDetail = () => {
  const params: any = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    RestaurantsService.getRestaurantDetail(params.id).then((res) => {
      setRestaurant(res.data);
    });
    RestaurantsService.getRestaurantReviews(params.id).then((res) => {
      setReviews(res.data.results);
    });
  }, []);

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
            <Grid container spacing={2} xs={12} alignItems="center" justifyContent="center">
              {reviews &&
                reviews.length &&
                reviews.map((review) => (
                  <Grid item xs={12} sm={4} md={3}>
                    <ReviewCard review={review} />
                  </Grid>
                ))}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default RestaurantDetail;
