import { useEffect, useState } from "react";
import RestaurantsService from "../../services/restaurantsService";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RestaurantCard from "../../components/RestaurantCard";
import ApplicationBar from "../../components/ApplicationBar";

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
          <Grid
            container
            spacing={2}
            xs={12}
            alignItems="center"
            justifyContent="center"
          >
            {restaurants &&
              restaurants.length &&
              restaurants.map((restaurant) => (
                <Grid item xs={12}>
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
