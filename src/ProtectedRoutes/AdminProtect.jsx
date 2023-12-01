import React from 'react'
import * as jwtDecode from 'jwt-decode';


import { Outlet } from "react-router-dom";

import UserHomePage from "../pages/User/UserHomePage";
import OwnerHomePage from "../pages/Owner/OwnerHomePage";


function AdminProtect() {
    const token = localStorage.getItem('token')
    console.log(token,'zrrrr')

    if (token) {
        const decode = jwtDecode(token)
        console.log(decode)
        if (decode.user_type == 'admin'){
            return <Outlet/>
        }else if (decode.user_type == 'user'){
            return <UserHomePage/>
        }else if (decode.user_type == 'owner'){
            return <OwnerHomePage/>
        }
        else{
            console.log(decode.user_type)
        }
    }
}

export default AdminProtect



