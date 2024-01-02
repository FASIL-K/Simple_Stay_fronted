import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLoginPage from '../pages/Admin/AdminLoginPage'
import AdminHomePage from '../pages/Admin/AdminHomePage'
import AdminProtect from '../ProtectedRoutes/AdminProtect'
import PrivateRoute from '../ProtectedRoutes/PrivateRoute'
import UserLists from '../pages/Admin/UserListing'
import PostList from '../pages/Admin/PostList'

function AdminsRoute() {
    return (
        <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/adminlogin/' element={<AdminLoginPage/>}/>
        </Route>
        <Route element={<AdminProtect/>}>
            <Route path='/adminhomepage/' element={<AdminHomePage/>}/>
            <Route path='/users/' element={<UserLists/>} />
            <Route path='/posts/' element={<PostList/>} />
   
            
        </Route>
    </Routes>
    )
}
export default AdminsRoute


