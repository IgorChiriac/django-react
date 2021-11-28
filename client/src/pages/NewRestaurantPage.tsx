import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useFormik } from "formik";
import RestaurantService from "../services/restaurantsService";
import { useHistory } from "react-router-dom";

const theme = createTheme();

function LoadingIndicator() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
}

export default function NewRestaurantPage() {
  const [formState, setFormState] = useState({ loading: false, error: null });
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
      cuisine_type: "",
      restaurant_photo: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      setFormState({ loading: true, error: null });
      let formData = new FormData();
      formData.append("name", formik.values.name);
      formData.append("cuisine_type", formik.values.cuisine_type);
      formData.append("restaurant_photo", formik.values.restaurant_photo);
      RestaurantService.createRestaurant(formData)
        .then(() => {
          history.push("/restaurants");
        })
        .catch((e) => {
          setFormState({ loading: false, error: e });
        });
    },
  });

  const onPhotoFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    formik.setFieldValue("restaurant_photo", event.target.files[0]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {formState.loading && <LoadingIndicator />}
          {formState.error && <Alert severity="error">{formState.error}</Alert>}
          <Typography component="h1" variant="h5">
            New Restaurant
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              disabled={formState.loading}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Restaurant Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <TextField
              disabled={formState.loading}
              margin="normal"
              required
              fullWidth
              name="cuisine_type"
              label="Cuisine Type"
              id="cuisine_type"
              value={formik.values.cuisine_type}
              onChange={formik.handleChange}
            />

            <TextField
              disabled={formState.loading}
              margin="normal"
              type="file"
              name="restaurant_photo"
              id="restaurant_photo"
              onChange={onPhotoFieldChange}
            />

            <Button
              type="submit"
              disabled={formState.loading}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
