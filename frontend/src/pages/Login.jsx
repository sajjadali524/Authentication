import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  window.history.forward();

  const navigate = useNavigate();

  const handleForm = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  axios.defaults.withCredentials = true;
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", input);
      const {token} = response.data;
      window.localStorage.setItem("token", token);
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center h-[85vh]">
      <div className="flex flex-col items-center justify-center h-full w-1/3 bg-red-200">
        <h1 className="text-center text-[20px] font-semibold">Login Your Account</h1>

        <form className="w-full px-10 space-y-3 mt-10" onSubmit={loginUser}>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter Email" name="email" onChange={handleForm} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter Password" name="password" onChange={handleForm} />
          </div>
          <h1>Dont have an account? <Link to="/register" className="text-blue-700">Register</Link></h1>
          <button type="submit" className="text-center bg-green-300 w-full py-3">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login