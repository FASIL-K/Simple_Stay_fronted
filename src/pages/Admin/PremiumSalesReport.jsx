import React from 'react'
import AdminSideBar from './AdminsideBar'
import PremiumSalesReports from '../../components/Admin/Pages/PremiumSalesReport'

export default function PremiumSalesReport() {
  return (
    <div>
    <>
      <div className="flex">
        <AdminSideBar />
        <PremiumSalesReports/>
      </div>
    </>
  </div>
  )
}
