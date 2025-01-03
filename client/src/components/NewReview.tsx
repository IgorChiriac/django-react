import { Typography, Button, Rating, Box, TextField } from "@mui/material";
import { useState } from "react";
import RestaurantsService from "../services/restaurantsService";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { useFormik } from "formik";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

interface Props {
  restaurantId: string;
  refresh: () => void;
}

const NewReview = (props: Props) => {
  const [formState, setFormState] = useState({ isLoading: false, error: null });
  const formik = useFormik({
    initialValues: {
      comment: "",
      num_stars: 0,
      visit_date: dayjs().format("YYYY-MM-DD"),
    },
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      setFormState({ isLoading: true, error: null });
      RestaurantsService.createReview(props.restaurantId, values)
        .then(() => {
          resetForm({});
          setFormState({ isLoading: false, error: null });
          props.refresh();
        })
        .catch((error) => {
          if (error.response) {
            setFormState({
              isLoading: false,
              error: error.response,
            });
          }
        });
    },
  });

  return (
    <Box
      display="flex"
      component="form"
      onSubmit={formik.handleSubmit}
      flexDirection="column"
      sx={{
        border: "1px solid black",
        padding: "2rem",
        backgroundColor: "#fdfdfd",
        position: "relative",
      }}
    >
      {formState.isLoading && (
        <Box component="div" sx={{ position: "absolute", width: "100%" }}>
          <CircularProgress />
        </Box>
      )}
      {formState.error && (
        <Alert severity="error">An error occurred saving the review.</Alert>
      )}
      <Typography gutterBottom variant="h6" component="div">
        Leave your review
      </Typography>
      <Rating
        name="review"
        value={formik.values.num_stars}
        onChange={(e, newValue) => {
          const num_stars = newValue ? newValue : 0;
          formik.setFieldValue("num_stars", num_stars);
        }}
      />
      <Box
        component="div"
        sx={{ mt: 4, display: "flex", justifyContent: "flex-start" }}
      >
        <MobileDatePicker
          label="Date of Visit"
          inputFormat="YYYY-MM-DD"
          value={formik.values.visit_date}
          disableFuture={true}
          onChange={(newValue: Date | null) => {
            formik.setFieldValue(
              "visit_date",
              dayjs(newValue).format("YYYY-MM-DD")
            );
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
      <TextField
        multiline
        rows={4}
        required
        value={formik.values.comment}
        onChange={formik.handleChange}
        size="small"
        margin="normal"
        id="comment"
        label="Comment"
        name="comment"
      />
      <Button
        variant="text"
        type="submit"
        disabled={formState.isLoading}
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: "#a899ff",
          width: "160px",
          color: "black",
          border: "1px solid black",
        }}
      >
        Add review
      </Button>
    </Box>
  );
};

export default NewReview;
