import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from '../ProtectedRoutes/PrivateRoute'
import OwnerProtect from '../ProtectedRoutes/OwnerProtect'

import OwnerSignupPage from '../pages/Owner/OwnerSignupPage'
import OwnerHomePage from '../pages/Owner/OwnerHomePage'

function OwnersRoutes() {
    return (
        <Routes>
        <Route exact element={<PrivateRoute/>}>
            <Route path='/signup/' element={<OwnerSignupPage/>} />
        </Route>
        <Route exact element = {<OwnerProtect/>}>

            <Route path='/home/' element = {<OwnerHomePage/>}/>
            
        </Route>
    </Routes>
    
      )
    }

export default OwnersRoutes

