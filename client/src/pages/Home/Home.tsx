import { useEffect, useState } from "react";
import RestaurantsService from "../../services/restaurantsService";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RestaurantCard from "../../components/RestaurantCard";
import ApplicationBar from "../../components/ApplicationBar";
import Box from "@mui/system/Box";
import mainImage from "./restaurantreview.jpeg";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { fetchEventSource } from "@microsoft/fetch-event-source";

class RetriableError extends Error { }
class FatalError extends Error { }

const Home = () => {
  const [restaurants, setRestaurants] = useState<any>([]);
  const theme = createTheme();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getRestaurantsPage(page);
  }, [page]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchEventSource('http://localhost:8001/events/', {
        async onopen(response) {
            if (response.ok) {
              console.log(response)
                return; // everything's good
            } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
                // client-side errors are usually non-retriable:
                throw new FatalError();
            } else {
                throw new RetriableError();
            }
        },
        onmessage(msg) {
            // if the server emits an error message, throw an exception
            // so it gets handled by the onerror callback below:
            console.log(msg)
            if (msg.event === 'FatalError') {
                throw new FatalError(msg.data);
            }
        },
        onclose() {
            // if the server closes the connection unexpectedly, retry:
            throw new RetriableError();
        },
        onerror(err) {
            if (err instanceof FatalError) {
                throw err; // rethrow to stop the operation
            } else {
                // do nothing to automatically retry. You can also
                // return a specific retry interval here.
            }
        }
    })
    };
    console.log('test')
    fetchData();
  }, []);

  const getRestaurantsPage = (page: number) => {
    RestaurantsService.getRestaurants(page).then((res) => {
      setRestaurants(res.data.results);
    });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <ApplicationBar />
        <Container
          component="main"
          maxWidth="md"
          sx={{ backgroundColor: "white", padding: "20px" }}
        >
          <CssBaseline />
          <Typography gutterBottom variant="h3" component="div">
            Rate the taste
          </Typography>
          <Box
            sx={{
              border: "2px solid #3e3750",
              borderRadius: "13px",
              backgroundColor: "#e9e6e6",
            }}
          >
            <img
              src={mainImage}
              alt="Restaurants Cover"
              style={{ objectFit: "cover", borderRadius: "13px" }}
              width="100%"
              height="200px"
            />
            <Typography gutterBottom variant="overline" component="div">
              Find the best restaurants around! Comments and reviews for
              everyone
            </Typography>
          </Box>
          {restaurants.length > 0 ? (
            <div>
              <Grid
                container
                spacing={2}
                marginTop={2}
                display="flex"
                alignContent="center"
                justifyItems="center"
              >
                {restaurants.map((restaurant: any) => (
                  <Grid key={restaurant.id} item xs={12} sm={4} md={3}>
                    <RestaurantCard restaurant={restaurant} />
                  </Grid>
                ))}
              </Grid>
              <div
                style={{
                  display: "flex",
                  padding: "2rem",
                  justifyContent: "center",
                }}
              >
                <Pagination
                  count={restaurants.count}
                  color="secondary"
                  onChange={(e, newValue) => {
                    setPage(newValue);
                  }}
                />
              </div>
            </div>
          ) : (
            <Box sx={{ mt: 4 }}>No Restaurants Available</Box>
          )}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Home;
