import React from 'react'
import { useNavigate } from 'react-router-dom'


function UserHome() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/user/login')
    }
  return (
    <div>
        <h1>Home Page</h1>
        <button onClick={handleLogout} >logout</button>
      
    </div>
  )
}

export default UserHome
