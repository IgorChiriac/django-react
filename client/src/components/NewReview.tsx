import { Card, CardMedia, CardContent, Typography, CardActions, Button, Rating, Box, TextField } from "@mui/material";

interface Props {}

const NewReview = (props: Props) => {
  return (
    <Box display="flex" flexDirection="column">
      <Rating name="review" value={3} />
      <TextField size="small" margin="normal" id="comment" label="Comment" name="comment" />
      <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Send review
      </Button>
    </Box>
  );
};

export default NewReview;
