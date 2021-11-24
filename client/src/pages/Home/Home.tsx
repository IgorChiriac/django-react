import * as React from "react";
import { useEffect, useContext, useState } from "react";
import RestaurantsService from "../../services/restaurantsService";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import RestaurantCard from "./components/RestaurantCard";
import Box from "@mui/material/Box";

const Home = () => {
  const { isLoggedIn, logOutUser, isLoading } = useContext(AuthContext);
  const [restaurants, setRestaurants] = useState([]);
  const theme = createTheme();
  useEffect(() => {
    RestaurantsService.getRestaurants().then((res) => {
      console.log(res.data.results);
      setRestaurants(res.data.results);
    });
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md" sx={{ backgroundColor: "white", padding: "20px" }}>
          <CssBaseline />
          {isLoading && <CircularProgress />}
          {isLoggedIn && <button onClick={() => logOutUser()}>Logout User</button>}
          <div>Home page</div>
          <Grid container spacing={2} xs={12} alignItems="center" justifyContent="center">
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
