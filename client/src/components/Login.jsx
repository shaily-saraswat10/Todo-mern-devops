import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Login = () => {

  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const API = import.meta.env.VITE_BACKEND_URL

  const handleLogin = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(`${API}/user/login`,{
          email, password
      },{
        withCredentials: true,
        headers: {"Content-Type":"application/json"}
      })
      console.log(data);
      toast.success(data.message || "Login sucessful")
      navigate("/")
      localStorage.setItem("jwt",data.token);
      setEmail("")
      setPassword("")
    } catch (error) {
      console.log(error)
      const errMsg = error.response?.data?.errors || error.response?.data?.message ||
      error.message || "Failed to login";

      toast.error(typeof errMsg === "string" ? errMsg : Array.isArray(errMsg) ?
         errMsg.join(", ") : JSON.stringify(errMsg));
    }
  }

  return (
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        <h2 className='text-2xl text-center font-semibold mb-5'>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className='font-semibold'>Email</label><br/>
            <input id='email' type='email' placeholder='Enter your email' className='w-full border border-gray-500
            focus:border-purple-600 focus:outline-none p-2 rounded-lg'
            value={email} onChange={(e)=>setEmail(e.target.value)}/><br/><br/>
            <label htmlFor="password" className='font-semibold'>Password</label><br/>
            <input id='password' type='password' placeholder='Enter your password' className='w-full border border-gray-500
            focus:border-purple-600 focus:outline-none p-2 rounded-lg'
            value={password} onChange={(e)=>setPassword(e.target.value)}/><br/><br/>
          </div>
          <button type="submit" className='w-full text-center bg-purple-600 text-white rounded-lg p-2 mb-2 shadow-lg
           hover:bg-purple-800'>Login</button>
          <p className='text-sm'>Account not created yet? <Link to="/signup" className="text-purple-600 
          hover:text-purple-800 hover:underline">Signup</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login
