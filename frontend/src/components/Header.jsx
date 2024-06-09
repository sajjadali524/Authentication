import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const Header = () => {
  const getToken = localStorage.getItem("token");

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
    <div className="bg-green-400 flex items-center justify-between px-10 py-3">
      <Link to="/">Header</Link>
      {getToken ? 
        <Link to="/logout" onClick={logoutUser}>Logout</Link> :
      <div className="space-x-5">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div> }
    </div>
  )
}

export default Header