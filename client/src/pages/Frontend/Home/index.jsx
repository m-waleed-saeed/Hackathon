import React from 'react'
import Hero from './Hero'
import DonationCard from './DonationCard'
import Newsletter from './Newsletter'
import Campaigns from '../Campiagn'

const Home = () => {
  return (
    <div>
      <Hero />
      <Campaigns />
      <DonationCard />
      <Newsletter />
    </div>
  )
}

export default Home