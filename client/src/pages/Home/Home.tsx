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

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const theme = createTheme();
  useEffect(() => {
    RestaurantsService.getRestaurants().then((res) => {
      setRestaurants(res.data.results);
    });
  }, []);

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
          <Box sx={{ border: "2px solid #3e3750", borderRadius: "13px", backgroundColor: "#e9e6e6" }}>
            <img src={mainImage} style={{ objectFit: "cover", borderRadius: "13px" }} width="100%" height="200px" />
            <Typography gutterBottom variant="h5" component="div">
              Rate the taste
            </Typography>
            <Typography gutterBottom variant="overline" component="div">
              Find the best restaurants around! Comments and reviews for everyone
            </Typography>
          </Box>
          <Grid container xs={12} spacing={2} marginTop={2} display="flex" alignContent="center" justifyItems="center">
            {restaurants &&
              restaurants.length &&
              restaurants.map((restaurant) => (
                <Grid item xs={4}>
                  <RestaurantCard restaurant={restaurant} />
                </Grid>
              ))}
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Home;
