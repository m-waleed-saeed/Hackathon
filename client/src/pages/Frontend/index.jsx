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

const Frontend = () => {
  const location = useLocation();

  // Check if current path is not-found
  const isNotFound = location.pathname !== '/'
    && location.pathname !== '/contact-us'
    && location.pathname !== '/about-us';
  return (
    <>
      {!isNotFound && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='contact-us' element={<ContactUs />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/user-account' element={<UserAccount />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      {!isNotFound && <Footer />}
    </>
  )
}

export default Frontend