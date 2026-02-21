import React from 'react'
import HomeSlider from './components/HomeSlider'
import AboutUsSection from './components/AboutUsSection'
import ProductsShowcase from './components/productSection'
import TestimonialSection from './components/TestimonialSection'
import GlobalManufacturerSection from './components/GlobalManufacturerSection'
import FAQSection from './components/FAQSection'
import GallerySection from './components/GallerySection'

const page = () => {
  return (
    <div>
       <HomeSlider/>
       <AboutUsSection/>
       <ProductsShowcase/>
       <TestimonialSection/>
       <GlobalManufacturerSection/>
       <FAQSection/>
       <GallerySection/>
    </div>
  )
}

export default page
