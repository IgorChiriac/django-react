import { useEffect, useContext, useState } from "react"
import RestaurantsService from '../services/restaurantsService'
import { AuthContext } from "../context/AuthContext";


const Home = ()=>{
  const { currentUser, isLoggedIn, logOutUser } = useContext(AuthContext);
  const [imgs, setImg] = useState([])
  useEffect(()=>{
    RestaurantsService.getRestaurants().then(res=>{
      console.log(res.data)
      setImg(res.data.results)
    })
  }, [])

  return (
    <>
      {isLoggedIn && <button onClick={()=>logOutUser()}>Logout User</button>}
      <div>Hi {currentUser?.username}</div>
      <div>Home page</div>
      {imgs.length > 0 && imgs.map((i: {restaurant_photo: string})=>{
        return <img src={i?.restaurant_photo}/>
      })}
    </>
  )
}

export default Home