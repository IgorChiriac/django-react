import { Card, CardMedia, CardContent, Typography, CardActions, Button, Rating, Box, TextField } from "@mui/material";
import { useState } from "react";
import RestaurantsService from "../services/restaurantsService";

interface Props {
  restaurantId: string;
}

const NewReview = (props: Props) => {
  const [reviewScore, setReviewScore] = useState(0);
  const [comment, setComment] = useState("");
  const sendReview = () => {
    RestaurantsService.setReview(props.restaurantId, reviewScore, comment);
  };

  return (
    <Box display="flex" flexDirection="column" sx={{ border: "1px solid black", padding: "3rem", backgroundColor: "#fdfdfd" }}>
      <Typography gutterBottom variant="h6" component="div">
        Leave your review
      </Typography>
      <Rating
        name="review"
        value={reviewScore}
        onChange={(e, newValue) => {
          console.log(e);
          //@ts-ignore
          setReviewScore(newValue);
        }}
      />
      <TextField
        multiline
        rows={4}
        value={comment}
        onChange={(e) => {
          console.log(e);
          //@ts-ignore
          setComment(e.target.value);
        }}
        size="small"
        margin="normal"
        id="comment"
        label="Comment"
        name="comment"
      />
      <Button
        variant="text"
        onClick={sendReview}
        sx={{ mt: 3, mb: 2, backgroundColor: "#a899ff", width: "160px", color: "black", border: "1px solid black" }}
      >
        Send review
      </Button>
    </Box>
  );
};

export default NewReview;
