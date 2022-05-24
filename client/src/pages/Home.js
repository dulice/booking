import React from 'react'
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