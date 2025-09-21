import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomeGrid from './HomeGrid'
import ContactMessages from './ContactMessages'
import Subscriber from './Subscriber'
import Users from './User'
import Donations from './Donations'
import Owner from './Owner/index.jsx'
import UpdateCampaignForm from './Owner/UpdateCampaign.jsx'

const DashboardRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="" element={<Navigate to="/dashboard/owner" replace />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/home-grid" element={<HomeGrid />} />
        <Route path="/contact-messages" element={<ContactMessages />} />
        <Route path="/subscribers" element={<Subscriber />} />
        <Route path="/users" element={<Users />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/owner/update-campaign/:id" element={<UpdateCampaignForm />} />
      </Routes>
    </div>
  )
}

export default DashboardRoutes