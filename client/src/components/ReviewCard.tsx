import { Card, CardMedia, CardContent, Typography, CardActions, Button, Rating, Box } from "@mui/material";

interface Props {
  review: any;
}

const ReviewCard = (props: Props) => {
  return (
    <Card>
      <CardContent>
        <Rating name="Reviews" value={3} readOnly />
        <Typography gutterBottom variant="body1" component="div">
          {props.review.author}
        </Typography>
        <Typography gutterBottom variant="caption" component="div">
          {new Date(props.review.visit_date).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.review.comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
