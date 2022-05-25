import React from 'react'
import { Helmet } from 'react-helmet-async'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Rooms from '../components/Rooms'
import Services from '../components/Services'
import Sponsorship from '../components/Sponsorship'
import Subscribe from '../components/Subscribe'
import Testimonial from '../components/Testimonial'
import Welcome from '../components/Welcome'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
        <Hero />
        <Welcome />
        <Services />
        <Rooms />
        <Testimonial />
        <Subscribe />
        <Sponsorship />
        <Footer />
    </div>
  )
}

export default Home