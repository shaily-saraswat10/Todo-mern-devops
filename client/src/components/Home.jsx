import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {

  const[todos, setTodos] = useState([]);
  const[error, setError] = useState(null);
  const[loading, setLoading] = useState(false);
  const[newtodo, setNewTodo] = useState("");

  const navigate = useNavigate()
  const API = import.meta.env.VITE_BACKEND_URL

  useEffect(()=>{
    const fetchtodos = async() =>{
       try {
          setLoading(true)
          const response = await axios.get(`${API}/todo/gettodo`,
         {
           withCredentials: true,
        }
      );
          setTodos(response.data.todos)
          setError(null);
       } catch (error) {
          setError('failed to fetch todos')
       }
       finally{
          setLoading(false);
       }
    } 
      fetchtodos();
  },[])

  const todoCreate = async()=>{
    if(!newtodo) return;
    try {
        const response = await axios.post(`${API}/todo/create`,{
           text: newtodo,
           completed: false
        },{
            withCredentials:true
        })
        setTodos([...todos,response.data]);
        setNewTodo("");
    } catch (error) {
        setError('failed to create todos')
    }
  }

  const todostatus = async(id)=>{
    const todo = todos.find((t)=>t._id === id)
    try {
        const response = await axios.put(`${API}/todo/update/${id}`,{
            ...todo,
            completed:!todo.completed
        },{
            withCredentials:true
        })
        setTodos(todos.map((t)=>(t._id === id ? response.data.todo : t)))
    } catch (error) {
       setError('failed to find todo status') 
    }
  }

  const tododelete = async(id)=>{
    try {
        await axios.delete(`${API}/todo/delete/${id}`,{
            withCredentials:true
        })
        setTodos(todos.filter((t)=>t._id!==id))
    } catch (error) {
        setError('failed to delete todo')
    }
  }

  const Logout = async () =>{
     try {
       await axios.get(`${API}/user/logout`,{
        withCredentials: true
       })
       toast.success("Logout successful")
       navigate("/login")
       localStorage.removeItem("jwt")
     } catch (error) {
        toast.error("Error logging out")
     }
  }

  const remainingTodos = todos.filter((todo)=> !todo.completed).length;

  return (
    <div className='bg-gradient-to-b from-[#68EACC] to-[#497BE8] w-full min-h-screen flex'>
    <div className='bg-white max-w-xl lg:max-w-xl shadow-lg mx-8 sm:mx-auto p-8 mt-4 mb-10'>

    <h1 className='text-2xl font-semibold text-center'>Todo App</h1> 

    <div className='flex m-4'>
       <input type='text' placeholder='Add your new todo...' onChange={(e)=>setNewTodo(e.target.value)} 
       onKeyPress={(e)=>e.key === "Enter" && todoCreate()}
       className='flex-grow px-2 py-1 border focus:border-[#8E49E8] focus:outline-none'/> 
       <button className='bg-purple-600 border  text-white px-3 py-1 hover:bg-purple-900 text-2xl'
       onClick={todoCreate}>+</button>
    </div>
    {loading ? (<div className='text-center justify-center'><span>Loading...</span></div>) 
    : error ? (<div className='text-center justify-center'>{error}</div>) : (
     <ul className='space-y-2 overflow-y-auto'>
      {
        todos.map((todo,index)=>{
          return (
          <li key={todo._id || index}className='flex items-center justify-between p-2 bg-gray-200'>
          <div className='flex items-center'>
          <input type='checkbox' className='mr-2' checked={todo.completed} onChange={()=>todostatus(todo._id)}/>
          <span className={`${todo.completed ? "line-through" : ""} text-gray-600`}>{todo.text}</span>
          </div>  
          <button className='text-red-600 hover:text-red-900' onClick={()=>tododelete(todo._id)}>Delete</button>
      </li>
     )
        })
      }
     </ul>
    )}
    <p className='mt-4 text-center text-sm text-gray-700'>{remainingTodos} Remaining todos</p>
    <button className='m-4 px-4 py-2 bg-red-600 hover:bg-red-800 text-white mx-auto block'
    onClick={()=>Logout()}>Logout</button>
    </div>
    </div>
  )
}

export default Home
