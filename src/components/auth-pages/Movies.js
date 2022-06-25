// Get faourite movies of the user.
import { useContext } from 'react'
import { User } from "../../context/User"

export default function Movies() {
    const user = useContext(User)
    console.log(user)
  return (
    <div>Movies</div>
  )
}
