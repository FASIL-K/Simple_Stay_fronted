import React from 'react';
import { jwtDecode } from "jwt-decode";
import { Outlet } from 'react-router-dom';
import AdminHomePage from '../pages/Admin/AdminHomePage';
import OwnerHomePage from '../pages/Owner/OwnerHomePage';

function UserProtect() {
    

    const token = localStorage.getItem('token');

    if (token) {
        const decode = jwtDecode(token); // Correct usage
        console.log(decode, 'fadscwds');
        if (decode.user_type === 'user') {
            return <Outlet />;
        } else if (decode.user_type === 'owner') {
            return <OwnerHomePage />;
        } else if (decode.user_type === 'admin') {
            return <AdminHomePage />;
        } else {
            // return <UnknownHomePage/>                                      use this once this page is created
            console.log(decode, "the else case of Customer Protected");
        }
    } else {
        // return <UnknownHomePage/>                                      use this once this page is created
        console.log('Token not found.');
    }
}

export default UserProtect;
