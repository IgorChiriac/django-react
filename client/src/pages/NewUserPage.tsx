import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserService from "../services/userService";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const theme = createTheme();
const label = { inputProps: { "aria-label": "Admin User" } };

export default function NewUserPage() {
  const history = useHistory();
  const [formState, setFormState] = useState({ loading: false, error: null });

  const onUpdateUser = (data: any) => {
    UserService.createUser(data)
      .then(() => {
        history.push("/users");
      })
      .catch((e) => {
        setFormState({ loading: false, error: e });
      });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
      is_admin: false,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      onUpdateUser(values);
    },
  });

  const onAdminFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("is_admin", event.target.checked);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {formState.loading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        {formState.error && <Alert severity="error">An error occured.</Alert>}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User name"
              name="username"
              autoComplete="username"
              autoFocus
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
              autoComplete="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="last_name"
              label="Last Name"
              name="last_name"
              autoComplete="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label="Email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />

            <FormControlLabel
              control={
                <Checkbox
                  {...label}
                  checked={formik.values.is_admin}
                  onChange={onAdminFieldChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Is Admin"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={formState.loading}
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
