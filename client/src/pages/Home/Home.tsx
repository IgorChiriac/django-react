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
import InfiniteScroll from "react-infinite-scroll-component";
import Pagination from "@mui/material/Pagination";

const Home = () => {
  const [restaurants, setRestaurants] = useState([] as any[]);
  const theme = createTheme();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(30);

  useEffect(() => {
    getRestaurantsPage();
  }, [page]);

  const getRestaurantsPage = () => {
    RestaurantsService.getRestaurants(page).then((res) => {
      setRestaurants(res.data.results);
      setTotal(res.data.count);
    });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <ApplicationBar />
        <Container component="main" maxWidth="md" sx={{ backgroundColor: "white", padding: "20px" }}>
          <CssBaseline />
          <Typography gutterBottom variant="h3" component="div">
            Rate the taste
          </Typography>
          <Box sx={{ border: "2px solid #3e3750", borderRadius: "13px", backgroundColor: "#e9e6e6" }}>
            <img src={mainImage} style={{ objectFit: "cover", borderRadius: "13px" }} width="100%" height="200px" />
            <Typography gutterBottom variant="overline" component="div">
              Find the best restaurants around! Comments and reviews for everyone
            </Typography>
          </Box>
          <Grid container xs={12} spacing={2} marginTop={2} display="flex" alignContent="center" justifyItems="center">
            {restaurants &&
              restaurants.length &&
              restaurants.map((restaurant) => (
                <Grid item xs={12} sm={4} md={3}>
                  <RestaurantCard restaurant={restaurant} />
                </Grid>
              ))}
          </Grid>
          <div style={{ display: "flex", padding: "2rem", justifyContent: "center" }}>
            <Pagination
              count={total / 10}
              color="secondary"
              onChange={(e, newValue) => {
                console.log(e, setPage(newValue));
              }}
            />
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Home;
