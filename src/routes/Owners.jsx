import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from '../ProtectedRoutes/PrivateRoute'
// import OwnerProtect from '../ProtectedRoutes/OwnerProtect'

import OwnerSignupPage from '../pages/Owner/OwnerSignupPage'
import OwnerLoginPage from '../pages/Owner/OwnerLoginPage'
import OwnerHomePage from '../pages/Owner/OwnerHomePage'

function OwnersRoutes() {
    return (
        <Routes>
        {/* Remove the PrivateRoute wrapper */}
        {/* <Route element={<PrivateRoute/>}> */}
            <Route path='/signup' element={<OwnerSignupPage/>} />
            <Route path='/login' element={<OwnerLoginPage/>} />
            <Route path='/home' element={<OwnerHomePage/>} />
        {/* </Route> */}
    </Routes>
    
      )
    }

export default OwnersRoutes

