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
  const [restaurant, setRestaurant] = useState<any>(null);

  const getRestaurantDetail = () => {
    RestaurantsService.getRestaurantDetail(params.id).then((res) => {
      setRestaurant(res.data);
    });
  };

  useEffect(() => {
    RestaurantsService.getRestaurantDetail(params.id).then((res) => {
      setRestaurant(res.data);
    });
  }, [params.id]);

  return (
    <>
      {restaurant && (
        <>
          <ApplicationBar />
          <Container
            component="main"
            maxWidth="md"
            sx={{ backgroundColor: "white", padding: "20px" }}
          >
            <RestaurantCard restaurant={restaurant} isDetailView />
            <Typography gutterBottom variant="h5" component="div" marginTop={3}>
              Reviews
            </Typography>
            <Typography gutterBottom variant="h6" component="div" marginTop={3}>
              Most relevant reviews
            </Typography>
            <Grid
              container
              spacing={2}
              marginTop={2}
              marginBottom={3}
              alignItems="center"
              justifyContent="center"
            >
              {restaurant &&
                restaurant.reviews_summary.length > 0 &&
                restaurant.reviews_summary.map((review: any, index: number) => (
                  <Grid item xs={12} sm={4} md={3} key={index}>
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
