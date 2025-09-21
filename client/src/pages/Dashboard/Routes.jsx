import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomeGrid from './HomeGrid'
import ContactMessages from './ContactMessages'

const DashboaedRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/home-grid" element={<HomeGrid />} />
        <Route path="/contact-messages" element={<ContactMessages />} />
      </Routes>
    </div>
  )
}

export default DashboaedRoutes