import { useEffect, useContext, useState } from "react";
import RestaurantsService from "../services/restaurantsService";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentUser, isLoggedIn, logOutUser } = useContext(AuthContext);
  const [imgs, setImg] = useState([]);
  useEffect(() => {
    RestaurantsService.getRestaurants().then((res) => {
      console.log(res.data);
      setImg(res.data.results);
    });
  }, []);

  return (
    <>
      {!isLoggedIn && (
        <header className="App-header">
          <div>
            <ul>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/signup"}>Signup</Link>
              </li>
            </ul>
          </div>
        </header>
      )}

      {isLoggedIn && (
        <div>
          <Link to={"/users"}>Users</Link>
          <button onClick={() => logOutUser()}>Logout User</button>
        </div>
      )}
      <div>Hi {currentUser?.username}</div>
      <div>Home page</div>
      {imgs.length > 0 &&
        imgs.map((i: { restaurant_photo: string }) => {
          return <img src={i?.restaurant_photo} />;
        })}
    </>
  );
};

export default Home;
