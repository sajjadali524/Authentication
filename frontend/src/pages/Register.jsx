import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const Register = () => {
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleForm = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/auth/register", input);
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center h-[85vh]">
      <div className="flex flex-col items-center justify-center h-full w-1/3 bg-red-200">
        <h1 className="text-center text-[20px] font-semibold">Register Your Account</h1>

        <form className="w-full px-10 space-y-3 mt-10" onSubmit={registerUser}>
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Enter Username" name="username" onChange={handleForm} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter Email" name="email" onChange={handleForm} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter Password" name="password" onChange={handleForm} />
          </div>
          <h1>Already have an account? <Link to="/login" className="text-blue-700">Login</Link></h1>
          <button type="submit" className="text-center bg-green-300 w-full py-3">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register