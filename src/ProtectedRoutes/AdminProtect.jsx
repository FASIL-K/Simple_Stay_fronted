import React from 'react'
import {jwtDecode} from 'jwt-decode';


import { Outlet } from "react-router-dom";

import UserHomePage from "../pages/User/UserHomePage";
import OwnerHomePage from "../pages/Owner/OwnerHomePage";

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function AdminProtect() {
    const token = localStorage.getItem('token')

    if (token) {
        const decode = parseJwt(token)

        console.log(decode , 'decoded');

        if (decode.user_type === "admin") {
            return <Outlet />
        } else if (decode.user_type === 'user') {
            return <Outlet />
        } else if (decode.user_type === 'owner') {
            return <Outlet />
        } else {
            console.log('Unknown user type:', decode.user_type);
            // Handle unknown user type, redirect, or show an error message
        }
    }
}

export default AdminProtect;


