import { useEffect } from "react"
import RestaurantsService from '../services/restaurantsService'

const Home = ()=>{
  useEffect(()=>{
    RestaurantsService.getRestaurants().then(res=>{
      console.log(res)
    })
  }, [])
  return (
    <div>Home page</div>
  )
}

export default Home