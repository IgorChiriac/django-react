import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
} from "@mui/material";
import { useHistory } from "react-router";

interface Props {
  restaurant: any;
  isDetailView?: boolean;
}

const RestaurantCard = (props: Props) => {
  const history = useHistory();
  const getCursor = () => (props.isDetailView ? "" : "cursor");

  return (
    <Card
      onClick={() => {
        !props.isDetailView &&
          history.push(`/restaurant/${props.restaurant.id}`);
      }}
      sx={{ cursor: getCursor() }}
    >
      <CardMedia
        component="img"
        height={props.isDetailView ? "320" : "130"}
        image={props.restaurant.restaurant_photo}
        alt="restaurant_main"
      />
      <CardContent sx={{ backgroundColor: "#dfdcf1" }}>
        <Typography gutterBottom variant="h5" component="div">
          {props.restaurant.name}
        </Typography>
        <Typography gutterBottom variant="caption" component="div">
          {props.restaurant.cuisine_type}
        </Typography>
        <Rating name="Reviews" value={props.restaurant.reviews_avg} readOnly />
        <Typography variant="body2" color="text.secondary">
          {props.restaurant.reviews_count} reviews
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
