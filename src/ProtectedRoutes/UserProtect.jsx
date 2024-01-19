import React from 'react';
import { jwtDecode } from "jwt-decode";
import { Outlet } from 'react-router-dom';
import AdminHomePage from '../pages/Admin/AdminHomePage';
import OwnerHomePage from '../pages/Owner/OwnerHomePage';
import UserLoginPage from '../pages/User/UserLoginPage';
import UserHomePage from '../pages/User/UserHomePage';

function UserProtect() {
    

    const token = localStorage.getItem('token');

    if (token) {
        
        const decode = jwtDecode(token); // Correct usage
        console.log(decode, 'fadscwds');
        if (decode.user_type === 'user') {
            return <Outlet />;
        } else if (decode.user_type === ' owner') {
            return <OwnerHomePage />;
        } else if (decode.user_type === 'admin') {
            return <Outlet />;
        } else {
            // return <UnknownHomePage/>                                      use this once this page is created
            console.log(decode, "the else case of Customer Protected");
        }
    } else {
        // return <UnknownHomePage/>                                      use this once this page is created
        return <UserLoginPage/>
        console.log('Token not found.');
    }
}

export default UserProtect;







// if (token) {

//     const AuthCheck = JSON.parse(localStorage.getItem('token'));
//     const createNewToken = () => {
//         const AuthCheckk = JSON.parse(localStorage.getItem('token'));
//         if (AuthCheck.access) {
//             const { access } = AuthCheckk
//             console.log('validate Access Token createNewToken  ', access);
//             const config = { headers: { Authorization: ` Bearer ${access}` } };
//             axios.get(RefreshTokenAuto, config)
//                 .then((response) => {
//                     // console.log('Response from server:', response.data);
//                     localStorage.setItem('token', JSON.stringify(response.data.token))
//                     // console.log(localStorage.getItem('token'), 'local storage');
//                 })
//                 .catch((error) => {
//                     console.error('Error making request:', error.data);
//                 });
//         } else {
//             localStorage.removeItem('token')
//             dispatch(resetState);
//             navigate('/login');
//             console.log("Error: ", error)
//         }
//     }

//     const refreshToken = () => {
//         if (AuthCheck.refresh) {
//             const { refresh } = AuthCheck
//             const refreshtoken = {
//                 refresh: refresh
//             }
//             try {
//                 axios.post(TokenRefresh, refreshtoken).then((response) => {
//                     // console.log(response.data, 'refrshh token');
//                     localStorage.setItem('token', JSON.stringify(response.data))
//                     createNewToken()
//                 })
//             } catch (error) {
//                 localStorage.removeItem('token')
//                 dispatch(resetState);
//                 navigate('/login');
//                 console.log("Error: ", error)
//             }
//         } else {
//             localStorage.removeItem('token')
//             dispatch(resetState);
//             navigate('/login');
//             console.log("Error: ", error)
//         }

//     }
//     console.log(AuthCheck, 'converting that token');
//     const { access } = AuthCheck
//     console.log('validate Access Token ', access);
//     const decoded = jwtDecode(token);
//     console.log('decode', decoded.user_id);
//     const config = { headers: { Authorization: ` Bearer ${access}` } };
//     const userAuthentication = async () => {
//         try {

//             const Authenticated = await axios.get(Authentication, config)
//             const response = await Authenticated.data
//             console.log(response, 'Authentication response data ')
//         } catch (error) {
//             console.log('access token not valid!');
//             refreshToken()
//         }
//     }
//     userAuthentication()

