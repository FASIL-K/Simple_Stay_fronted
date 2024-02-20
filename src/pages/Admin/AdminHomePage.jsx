import React from 'react'
import { SideBar } from '../../components/Admin/Layouts/SideBar'
import AdminLandingPage from '../../components/Admin/Pages/AdminLandingPage'

function AdminHomePage() {
  return (
      
    <div className="flex">

    <SideBar/>
  <AdminLandingPage/>
    </div>

  )
}

export default AdminHomePage
