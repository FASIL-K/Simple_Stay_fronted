import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from '../ProtectedRoutes/PrivateRoute'
import OwnerProtect from '../ProtectedRoutes/OwnerProtect'

import OwnerSignupPage from '../pages/Owner/OwnerSignupPage'
import OwnerHomePage from '../pages/Owner/OwnerHomePage'
import PostCreation from '../pages/Owner/PostCreation'
import ListProperty from '../pages/Owner/ListProperty'
import OwnerProfile from '../pages/Owner/OwnerProfile'
import EditPropertys from '../pages/Owner/EditPropertys'

function OwnersRoutes() {
    return (
        <Routes>
        <Route exact element={<PrivateRoute/>}>
            <Route path='/signup/' element={<OwnerSignupPage/>} />
        </Route>
        <Route exact element = {<OwnerProtect/>}>

            <Route path='/ownerhome/' element = {<OwnerHomePage/>}/>
            <Route path='/add-properties/' element = {<PostCreation/>}/>
            <Route path='/list-properties/' element = {<ListProperty/>}/>
            <Route path='/edit-properties/:propertyId' element={<EditPropertys />} />
            <Route path='/profile/' element = {<OwnerProfile/>}/>
            

            
        </Route>
    </Routes>
    
      )
    }

export default OwnersRoutes

