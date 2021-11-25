import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import RestaurantsService from "../../services/restaurantsService";
import { useParams } from "react-router";
import { useEffect } from "react";

const RestaurantDetail = () => {
  const params: any = useParams();

  useEffect(() => {
    console.log("hey");
    RestaurantsService.getRestaurantDetail(params.id).then((res) => {
      console.log(res);
    });
    RestaurantsService.getRestaurantReviews(params.id).then((res) => {
      console.log(res);
    });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Restaurant"
            name="name"
            autoComplete="name"
            InputProps={{
              readOnly: true,
            }}
            value="my resjajksd "
          />

          <TextField
            margin="normal"
            fullWidth
            id="cuisine"
            label="Cuisine type"
            name="cuisine"
            autoComplete="cuisine"
            InputProps={{
              readOnly: true,
            }}
            value="my resjajksd "
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Save
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RestaurantDetail;
