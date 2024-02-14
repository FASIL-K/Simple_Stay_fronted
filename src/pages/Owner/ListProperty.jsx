import React from 'react'
import ListPropertys from '../../components/Owner/Pages/ListProperty'
import Navbar from '../../components/Owner/Pages/Layouts/Navbar'
import FilterBar from '../../components/Owner/Pages/Layouts/FilterBar'

function ListProperty() {
  return (
    <div>
        <Navbar />

        {/* <ListPropertys/> */}
        <FilterBar/>
      
    </div>
  )
}

export default ListProperty
