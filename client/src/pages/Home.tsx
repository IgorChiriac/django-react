import { useEffect, useContext } from "react"
import RestaurantsService from '../services/restaurantsService'
import { AuthContext } from "../context/AuthContext";


const Home = ()=>{
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  console.log(isLoggedIn)
  useEffect(()=>{
    RestaurantsService.getRestaurants().then(res=>{
      console.log(res)
    })
  }, [])

  return (
    <>
      {isLoggedIn && <button onClick={()=>logOutUser()}>Logout User</button>}
      <div>Home page</div>
    </>
  )
}

export default Home