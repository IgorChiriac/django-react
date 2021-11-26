import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Rating,
  Box,
} from "@mui/material";
import dayjs from 'dayjs'

interface Props {
  review: any;
}

// @ts-ignore
const ReviewCard = (props: Props) => {
  return (
    <Card>
      <CardContent sx={{ backgroundColor: "#dfdcf1" }}>
        <Rating name="Reviews" value={3} readOnly />
        <Typography gutterBottom variant="body1" component="div">
          {props.review.author}
        </Typography>
        <Typography gutterBottom variant="caption" component="div">
          {dayjs(props.review.visit_date).fromNow()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.review.comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
