import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserService, { IUser } from "../services/userService";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";

const theme = createTheme();
const label = { inputProps: { "aria-label": "Admin User" } };

export default function EditUserPage() {
  const { id: userId }: any = useParams();
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    is_admin: false,
  });

  useEffect(() => {
    UserService.getUserById(userId)
      .then((res: { data: IUser }) => {
        setCurrentUser(res.data);
      })
      .catch((error) => {});
  }, [userId]);

  const onDeleteUser = () => {
    UserService.deleteUserById(userId).then(() => {
      history.push("/users");
    });
  };

  const onUpdateUser = (data: any) => {
    UserService.updateUser(data).then((res: { data: IUser }) => {
      history.push("/users");
    });
  };

  const formik = useFormik({
    initialValues: currentUser,
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
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => onDeleteUser()}
            >
              Delete User
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
