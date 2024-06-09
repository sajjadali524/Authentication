import axios from "axios";
import {useNavigate} from "react-router-dom"
const Logout = () => {

  const navigate = useNavigate();
  const logoutUser = (e) => {
    e.preventDefault();
    try {
      axios.get("http://localhost:8000/api/auth/logout")
      localStorage.removeItem("token");
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <button type="submit" onClick={logoutUser}></button>
  )
}

export default Logout