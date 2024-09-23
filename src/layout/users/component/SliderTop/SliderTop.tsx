import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination'; // Import pagination styles
import 'tailwindcss/tailwind.css';
import './SliderTop.scss';

const SliderTop: React.FC = () => {
  return (
    <div className="sliderTop relative w-full h-screen">
      <Swiper
        modules={[Autoplay, Pagination]} // Autoplay and Pagination modules
        loop={true} // Enable infinite loop
        pagination={{ clickable: true, dynamicBullets: true }} // Clickable pagination dots with dynamic size
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay with 3 seconds delay
        className="h-full"
        spaceBetween={50} // Space between slides
      >
        {/* Slide 1 */}
        <SwiperSlide className="flex justify-center items-center p-12">
          <div className="text-black max-w-[1140px] mx-auto grid grid-cols-gridProductDetail p-12 gap-20">
            <div className="slider-img">
              <img className='w-full h-[400px] object-contain' src="https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png" alt="" />
            </div>
            <div className="slider-content pt-[20%]">
              <h1 className="text-5xl font-bold text-white">Best Roof Top Cafe in Patna</h1>
              <p className="text-2xl mt-3 text-white">Hot Spicy Murg Dum Biryani</p>
              <p className="text-3xl font-semibold text-white mt-3">$399</p>
              <button className='btn-type-2 mt-8'><span>Order now</span></button>
            </div>

          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="flex justify-center items-center p-12">
          <div className="text-black max-w-[1140px] mx-auto grid grid-cols-gridProductDetail p-12 gap-20">
            <div className="slider-img">
              <img className='w-full h-[400px] object-contain' src="https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png" alt="" />
            </div>
            <div className="slider-content pt-[20%]">
              <h1 className="text-5xl font-bold text-white">Best Roof Top Cafe in Patna</h1>
              <p className="text-2xl mt-3 text-white">Hot Spicy Murg Dum Biryani</p>
              <p className="text-3xl font-semibold text-white mt-3">$399</p>
              <button className='btn-type-2 mt-8'><span>Order now</span></button>
            </div>

          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className="flex justify-center items-center p-12">
          <div className="text-black max-w-[1140px] mx-auto grid grid-cols-gridProductDetail p-12 gap-20">
            <div className="slider-img">
              <img className='w-full h-[400px] object-contain' src="https://modinatheme.com/html/foodking-html/assets/img/shop-food/details-1.png" alt="" />
            </div>
            <div className="slider-content pt-[20%]">
              <h1 className="text-5xl font-bold text-white">Best Roof Top Cafe in Patna</h1>
              <p className="text-2xl mt-3 text-white">Hot Spicy Murg Dum Biryani</p>
              <p className="text-3xl font-semibold text-white mt-3">$399</p>
              <button className='btn-type-2 mt-8'><span>Order now</span></button>
            </div>

          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderTop;
