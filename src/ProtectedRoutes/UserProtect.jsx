import React from 'react'
import * as jwtDecode from 'jwt-decode';
import { Outlet } from 'react-router-dom'
import AdminHomePage from '../pages/Admin/AdminHomePage'
import OwnerHomePage from '../pages/Owner/OwnerHomePage'

function UserProtect() {
    const token = localStorage.getItem('token')

    if (token) {
        const decode = jwtDecode(token)
        if (decode.user_type === 'user') {
            return <Outlet/>
        } else if (decode.user_type === 'owner') {
            // if (!decode.is_completed) {                                  once the is_completed field to validate the customer done use this and delete the older return <Cus.../>
            //     // return <CustomerCreation/>                                        
            //     console.log(decode, "to be fixed ")
            // } else {
            //     return <Outlet/>
            // }
            return <OwnerHomePage/>
        }else if (decode.user_type === 'admin'){
            return <AdminHomePage/>
        }else {
            // return <UnknownHomePage/>                                      use this once this page is created
            console.log(decode, "the else case of Customer Protected")
        }
    } else {
        // return <UnknownHomePage/>                                      use this once this page is created
        console.log(decode, "the else case of Customer Protected if this was null it means no data there to decode")
   }
}

export default UserProtect


