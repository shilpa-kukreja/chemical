"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import axios from "axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchBanners();
  }, []);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://chemical-backend-6oix.onrender.com";

const fetchBanners = async () => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/mainbanner/all`
    );

    console.log("Banners:", res.data);

    const bannersArray = res.data.banners || [];

    const activeBanners = bannersArray.filter(
      (banner) => banner.status === true
    );

    setBanners(activeBanners);

  } catch (error) {
    console.error("Error fetching banners:", error);
  }
};


  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
    cssEase: "ease-in-out",
  };

 return (
  <section className="w-full overflow-hidden">

    {/* ================= DESKTOP SLIDER (Dynamic) ================= */}
    <div className="hidden md:block">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={banner._id} className="relative w-full">
            <img
              src={`${API_BASE_URL}${banner.image}`}
              alt="Main Banner"
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>

    {/* ================= MOBILE SLIDER (Static) ================= */}
    <div className="block md:hidden">
      <Slider {...settings}>
        {[
          "/bannermobile.jpeg",
          "/bannermobile1.jpeg"
        ].map((img, index) => (
          <div key={index} className="relative w-full">
            <img
              src={img}
              alt={`Mobile Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>

  </section>
);
};

export default HomeSlider;
