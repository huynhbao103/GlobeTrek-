import React from 'react'
import Header from '../header1/Header.jsx'
import TourBooking from './TourBooking.jsx'
import Footer from '../footer/Footer.jsx'

function BodyPay() {
  return (
    <div>
        <Header/>
        <div className='max-w-[1280px] mt-20 mx-auto '>
        <div >
        <TourBooking/>
        </div>
        <div className='max-sm:hidden'>
        </div>
        
        </div>
        <div className='max-sm:hidden'>
        <Footer />
        </div>
    </div>
  )
}

export default BodyPay