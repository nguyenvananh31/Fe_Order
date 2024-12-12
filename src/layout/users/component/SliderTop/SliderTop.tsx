
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination'; // Import pagination styles
import 'tailwindcss/tailwind.css';
import './SliderTop.scss';
import { convertPriceVND } from '../../../../utils/common';

const SliderTop: React.FC = () => {
  return (
    <div className="sliderTop relative w-full">
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
              <img className='w-full h-[400px] object-cover object-center rounded-full' src="/images/banner/slider1.jpg" alt="" />
            </div>
            <div className="slider-content pt-[20%]">
              <h1 className="text-5xl font-bold text-green-500">Lẩu riêu cua bắp bò</h1>
              <p className="text-2xl mt-3 text-primary">Lẩu riêu cua bắp bò là món ăn được nhiều người yêu thích, nhất là vào dịp thời tiết se se lạnh. Nước lẩu nóng hổi, ngọt thanh, riêu cua thơm lựng, thịt bò mềm mịn hòa quyện với nhau tạo nên món ăn ngon tuyệt vời.</p>
              <p className="text-3xl font-semibold text-red-500 mt-3">{convertPriceVND(600000)}</p>
              <button className='btn-type-2 mt-8'><span>Đặt ngay</span></button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="flex justify-center items-center p-12">
          <div className="text-black max-w-[1140px] mx-auto grid grid-cols-gridProductDetail p-12 gap-20">
            <div className="slider-img">
              <img className='w-full h-[400px] object-cover object-center rounded-full' src="/images/banner/slider2.jpg" alt="" />
            </div>
            <div className="slider-content pt-[20%]">
              <h1 className="text-5xl font-bold text-green-500">Lẩu hải sản kiểu thái</h1>
              <p className="text-2xl mt-3 text-primary">Hương vị chua cay đậm đà hòa quyện với mùi hương thơm nồng của hải sản làm đánh thức mọi vị giác khi đến gần chúng.</p>
              <p className="text-3xl font-semibold text-red-500 mt-3">{convertPriceVND(599000)}</p>
              <button className='btn-type-2 mt-8'><span>Đặt ngay</span></button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className="flex justify-center items-center p-12">
          <div className="text-black max-w-[1140px] mx-auto grid grid-cols-gridProductDetail p-12 gap-20">
            <div className="slider-img">
              <img className='w-full h-[400px] object-cover object-center rounded-full' src="/images/banner/slider2.jpg" alt="" />
            </div>
            <div className="slider-content pt-[20%]">
              <h1 className="text-5xl font-bold text-green-500">Lẩu gà đen H'mong Thảo mộc</h1>
              <p className="text-2xl mt-3 text-primary">Nước dùng lẩu được nấu từ các loại thảo mộc thơm lừng, đậm hương vị núi rừng Tây Bắc cùng với đa dạng các loại rau tươi ăn kèm. 1 nồi lẩu gà đen h’mong thảo mộc là lựa chọn tuyệt vời cho buổi liên hoan, tụ tập cùng với người thân, bạn bè.</p>
              <p className="text-3xl font-semibold text-red-500 mt-3">{convertPriceVND(400000)}</p>
              <button className='btn-type-2 mt-8'><span>Đặt ngay</span></button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderTop;
