import { Card, CardMedia, CardContent, Typography, CardActions, Button, Rating, Box } from "@mui/material";
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
        !props.isDetailView && history.push(`/restaurant/${props.restaurant.id}`);
      }}
      sx={{ cursor: getCursor() }}
    >
      <CardMedia
        component="img"
        height={props.isDetailView ? "320" : "130"}
        image={
          "https://phantom-marca.unidadeditorial.es/a7a94dd4627f134e5b87586e83a6cd44/resize/1320/f/webp/assets/multimedia/imagenes/2021/11/06/16362306284114.jpg"
        }
        alt="restaurant_main"
      />
      <CardContent>
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
