import { Card, CardMedia, CardContent, Typography, CardActions, Button, Rating, Box, TextField } from "@mui/material";
import { height } from "@mui/system";

interface Props {}

const NewReview = (props: Props) => {
  return (
    <Box display="flex" flexDirection="column" sx={{ border: "1px solid black", padding: "3rem", backgroundColor: "#fdfdfd" }}>
      <Typography gutterBottom variant="h6" component="div">
        Leave your review
      </Typography>
      <Rating name="review" value={3} />
      <TextField multiline rows={4} size="small" margin="normal" id="comment" label="Comment" name="comment" />
      <Button
        variant="text"
        sx={{ mt: 3, mb: 2, backgroundColor: "#a899ff", width: "160px", color: "black", border: "1px solid black" }}
      >
        Send review
      </Button>
    </Box>
  );
};

export default NewReview;
