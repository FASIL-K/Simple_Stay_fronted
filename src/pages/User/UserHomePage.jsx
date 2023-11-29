import React from 'react'
import UserHome from '../../components/User/pages/UserHome'
import { Navbar } from '@material-tailwind/react'
import { StickyNavbar } from '../../components/Layout/Navbar/UserNavbar'

function UserHomePage() {
  return (
    <div>
      <StickyNavbar/>
        <UserHome/>
    </div>
  )
}

export default UserHomePage
