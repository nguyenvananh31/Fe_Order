/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination'; // Import pagination styles
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'tailwindcss/tailwind.css';
import { getImageUrl } from '../../../../constants/common';
// interface Subcategory {
//     id: number;
//     name: string;
//     image: string;
//     status: number;
//     parent_id: number | null;
//     name_parent: string | null;
//     subcategory: Subcategory[]; // Đệ quy cho danh sách subcategories con
//     created_at: string;
//     updated_at: string;
// }

// interface Category {
//     id: number;
//     name: string;
//     image?: string;
//     thumbnail?: string;
//     status: number;
//     parent_id: number | null;
//     name_parent: string | null;
//     subcategory: Subcategory[];
//     created_at: string;
//     updated_at: string;
// }

interface IProps {
    cates: any[],
    loadingCate: boolean;
}

const SliderCate = ({ cates, loadingCate }: IProps) => {

    if (loadingCate) {
        return <div className='flex justify-center items-center min-h-20'>
            <Spin />
        </div>
    }

    return (
        <div className="sliderCate bg-bgColor1 relative w-full p-0 py-6 md:p-12">
            <Swiper
                modules={[Autoplay, Pagination]} // Autoplay and Pagination modules
                loop={true} // Enable infinite loop
                pagination={{ clickable: true, dynamicBullets: true }} // Clickable pagination dots with dynamic size
                autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay with 3 seconds delay
                className="h-full max-w-[1140px] mx-auto md:px-[16px] px-3 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:grid-cols-3"
                spaceBetween={10} // Space between slides
                slidesPerView="auto"
            >
                {/* Slide 1 */}
                {cates?.map((cate, index) => (
                    <SwiperSlide key={index} className="flex justify-center items-center">
                        <div className="cate-item-wrapper bg-white hover:bg-mainColor3 px-6 py-12 rounded-md cursor-pointer group w-[228px] h-[410px]">
                            <div className="cate-item-img">
                                <img src={`${getImageUrl(cate.image)}`} className="cate-item__img w-full min-w-[180px] h-[200px] object-contain" />
                            </div>
                            <div className="cate-item-content text-center">
                                <span className='block w-[30%] h-1 bg-mainColor1 mx-auto my-6'></span>
                                <Link to={`/product/category/${cate.id}`}><h3 className='cate-item__title text-center text-textColor1 text-3xl group-hover:text-white'>{cate?.name}</h3></Link>
                                {/* <span className="cate-item-quantity text-mainColor1 text-md block mt-2">{cate.subcategory.length} Sản phẩm</span> */}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SliderCate;