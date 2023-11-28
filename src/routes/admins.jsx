import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLoginPage from '../pages/Admin/AdminLoginPage'
import AdminHomePage from '../pages/Admin/AdminHomePage'
import AdminProtect from '../ProtectedRoutes/AdminProtect'
import PrivateRoute from '../ProtectedRoutes/PrivateRoute'


function AdminsRoute() {
    return (
        <Routes>
            <Route element={<PrivateRoute/>}>
              <Route path='/login' element={<AdminLoginPage/>} />
            </Route>
            <Route element={<AdminProtect/>}>
              <Route path='/' element={<AdminHomePage />} />
            </Route>
        </Routes>
    )
}
export default AdminsRoute


