import { useEffect, useState } from "react";
import RestaurantsService from "../../services/restaurantsService";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RestaurantCard from "../../components/RestaurantCard";
import ApplicationBar from "../../components/ApplicationBar";
import Box from "@mui/system/Box";
import mainImage from "./restaurantreview.jpeg";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

const Home = () => {
  const [restaurants, setRestaurants] = useState<any>([]);
  const theme = createTheme();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getRestaurantsPage(page);
  }, [page]);

  const getRestaurantsPage = (page: number) => {
    RestaurantsService.getRestaurants(page).then((res) => {
      setRestaurants(res.data.results);
    });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <ApplicationBar />
        <Container
          component="main"
          maxWidth="md"
          sx={{ backgroundColor: "white", padding: "20px" }}
        >
          <CssBaseline />
          <Typography gutterBottom variant="h3" component="div">
            Rate the taste
          </Typography>
          <Box
            sx={{
              border: "2px solid #3e3750",
              borderRadius: "13px",
              backgroundColor: "#e9e6e6",
            }}
          >
            <img
              src={mainImage}
              alt="Restaurants Cover"
              style={{ objectFit: "cover", borderRadius: "13px" }}
              width="100%"
              height="200px"
            />
            <Typography gutterBottom variant="overline" component="div">
              Find the best restaurants around! Comments and reviews for
              everyone
            </Typography>
          </Box>
          {restaurants.length > 0 ? (
            <div>
              <Grid
                container
                spacing={2}
                marginTop={2}
                display="flex"
                alignContent="center"
                justifyItems="center"
              >
                {restaurants.map((restaurant: any) => (
                  <Grid key={restaurant.id} item xs={12} sm={4} md={3}>
                    <RestaurantCard restaurant={restaurant} />
                  </Grid>
                ))}
              </Grid>
              <div
                style={{
                  display: "flex",
                  padding: "2rem",
                  justifyContent: "center",
                }}
              >
                <Pagination
                  count={restaurants.count}
                  color="secondary"
                  onChange={(e, newValue) => {
                    console.log(e, setPage(newValue));
                  }}
                />
              </div>
            </div>
          ) : (
            <Box sx={{ mt: 4 }}>No Restaurants Available</Box>
          )}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Home;
