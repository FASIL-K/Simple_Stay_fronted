import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from '../ProtectedRoutes/PrivateRoute'
import OwnerProtect from '../ProtectedRoutes/OwnerProtect'

import OwnerSignupPage from '../pages/Owner/OwnerSignupPage'
import OwnerLoginPage from '../pages/Owner/OwnerLoginPage'
import OwnerHomePage from '../pages/Owner/OwnerHomePage'

function OwnersRoutes() {
    return (
        <Routes>
            <Route element={<PrivateRoute/>}>
                <Route path='/signup' element={<OwnerSignupPage/>} />
                <Route path='/login' element={<OwnerLoginPage/>} />
            </Route>
    
            <Route element={<OwnerProtect/>}>
                <Route path='/owner/home ' element= {<OwnerHomePage/>} />
    
            </Route>
        </Routes>
      )
    }

export default OwnersRoutes

