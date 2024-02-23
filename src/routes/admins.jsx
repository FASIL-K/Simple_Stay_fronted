import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLoginPage from '../pages/Admin/AdminLoginPage'
import AdminHomePage from '../pages/Admin/AdminHomePage'
import AdminProtect from '../ProtectedRoutes/AdminProtect'
import PrivateRoute from '../ProtectedRoutes/PrivateRoute'
import UserLists from '../pages/Admin/UserListing'
import PostList from '../pages/Admin/PostList'
import PremiumSalesReport from '../pages/Admin/PremiumSalesReport'
import ErrorPage from '../pages/404Page/404'

function AdminsRoute() {
    return (
        <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path='/adminlogin/' element={<AdminLoginPage/>}/>
        </Route>
        <Route element={<AdminProtect/>}>
            <Route path='adminhomepage' element={<AdminHomePage/>}/>
            <Route path='/users/' element={<UserLists/>} />
            <Route path='/posts/' element={<PostList/>} />
            <Route path='/premuimsales/' element={<PremiumSalesReport/>} />

        </Route>
        <Route element={<ErrorPage />} path='/*' />

    </Routes>
    )
}
export default AdminsRoute


