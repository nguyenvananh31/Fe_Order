// SliderTop.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/autoplay';
import 'swiper/css/pagination'; // Import pagination styles
import 'tailwindcss/tailwind.css';
import { Button } from 'antd';

import { Autoplay, Pagination } from 'swiper/modules'; // Import Pagination

const SliderTop: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-red-900">
      <Swiper
        modules={[Autoplay, Pagination]} // Add Pagination module
        loop={true}
        pagination={{ clickable: true }} // Enable clickable dots
        className="h-full"
      >
        <SwiperSlide className="flex justify-center items-center">
          <div className="text-white flex flex-col items-center space-y-4">
            <h1 className="text-4xl font-bold">Best Roof Top Cafe in Patna</h1>
            <p className="text-xl">Hot Spicy Murg Dum Biryani</p>
            <p className="text-3xl font-semibold">₹399</p>
            <Button type="primary" size="large" className="bg-green-600">
              Order Now
            </Button>
          </div>
        </SwiperSlide>

        <SwiperSlide className="flex justify-center items-center">
          <div className="text-white flex flex-col items-center space-y-4">
            <h1 className="text-4xl font-bold">Delicious Paneer Butter Masala</h1>
            <p className="text-xl">Only available for a limited time</p>
            <p className="text-3xl font-semibold">₹299</p>
            <Button type="primary" size="large" className="bg-green-600">
              Order Now
            </Button>
          </div>
        </SwiperSlide>

        {/* Add more slides as needed */}
      </Swiper>
    </div>
  );
};

export default SliderTop;
