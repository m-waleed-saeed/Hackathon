import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../../components/Header'
import Home from './Home'
import Footer from '../../components/Footer'
import ContactUs from './ContactUs'
import AboutUs from './AboutUs'
import PageNotFound from '../../components/PageNotFound'
import { useLocation } from 'react-router-dom'
import UserAccount from './UserAccount'
import Campaigns from './Campiagn'
import Doner from './Doner'
import CampaignInfo from './CampaignInfo'

const Frontend = () => {
  const location = useLocation();

  const isNotFound = location.pathname !== '/'
    && location.pathname !== '/contact-us'
    && location.pathname !== '/about-us'
    && location.pathname !== '/campaigns'
    && location.pathname !== '/my-donations'
    && location.pathname !== '/campaign-info/:id'
    && location.pathname !== '/user-account';
  return (
    <>
      {!isNotFound && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='contact-us' element={<ContactUs />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/user-account' element={<UserAccount />} />
        <Route path='/campaigns' element={<Campaigns />} />
        <Route path='/my-donations' element={<Doner />} />
        <Route path='/campaign-info/:id' element={<CampaignInfo />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      {!isNotFound && <Footer />}
    </>
  )
}

export default Frontend