import { CoffeeOutlined, SearchOutlined } from "@ant-design/icons";
import "../Product/css/products.css";
import "./about.css";
import { useEffect, useState } from "react";

const About = () => {


  const [visibleImages, setVisibleImages] = useState<string[]>([]);

  const [imageCount, setImageCount] = useState<number>(7); // Mặc định là 7 cho PC
  useEffect(() => {
    const updateVisibleImages = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setImageCount(1); // Mobile
      } else if (width < 1024) {
        setImageCount(3); // iPad
      } else if (width < 1280) {
        setImageCount(5); // Laptop
      } else {
        setImageCount(7); // PC
      }
    };

    updateVisibleImages(); // Khởi tạo lần đầu
    window.addEventListener('resize', updateVisibleImages); // Cập nhật khi thay đổi kích thước

    return () => window.removeEventListener('resize', updateVisibleImages); // Dọn dẹp
  }, []);
  useEffect(() => {
    setVisibleImages(images.slice(0, imageCount));

    const interval = setInterval(() => {
      setVisibleImages((prev) => {
        const newImages = [...prev];
        newImages.shift(); // Ẩn ảnh đầu tiên
        const nextIndex = (images.indexOf(prev[prev.length - 1]) + 1) % images.length;
        newImages.push(images[nextIndex]); // Thêm ảnh mới
        return newImages;
      });
    }, 1000); // Thay đổi mỗi giây

    return () => clearInterval(interval); // Dọn dẹp khi component unmount
  }, [imageCount]); // Chạy lại khi imageCount thay đổi


  const images = [
    "/images/instagram-banner/01.jpg",
    "/images/instagram-banner/02.jpg",
    "/images/instagram-banner/03.jpg",
    "/images/instagram-banner/04.jpg",
    "/images/instagram-banner/05.jpg",
    "/images/instagram-banner/06.jpg",
    "/images/instagram-banner/07.jpg",
    "/images/instagram-banner/08.jpg",
    "/images/instagram-banner/09.jpg",
    "/images/instagram-banner/10.jpg",
  ];

  return (
    <>
      <div className="w-full bg-about">
        <div className="xl:mx-[196px] lg:mx-[150px] md:mx-6 sm:mx-4 xs:mx-2">
          <section className="about-section py-16">
            <div className="container mx-auto">
              <div className="about-wrapper">
                <div className="flex flex-wrap">
                  <div
                    className="w-full lg:w-1/2 lg:mb-0 wow fadeInUp"
                    data-wow-delay=".3s"
                  >
                    <div className="about-image relative md:m-3 md:p-3 md:mb-16">
                      <img
                        src="/images/about/burger.png"
                        alt="about-img"
                        className="lg:w-full lg:h-auto lg:p-7 md:ml-16 sm:w-full"
                      />
                      <div className="burger-text absolute top-0 left-0">
                        <img
                          src="/images/about/burger-text.png"
                          alt="shape-img"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 lg:mt-4 pr-9 md:pl-3 about-reponsive">
                    <div className="about-content">
                      <div className="section-title">
                        <span className="text-2xl font-semibold text-gray-600 wow fadeInUp">
                          about our food
                        </span>
                        <h2
                          className="text-5xl sm:text-6xl lg:text-7xl font-bold wow fadeInUp mt-4"
                          data-wow-delay=".3s"
                        >
                          Where Quality Meets Excellent{" "}
                          <span className="text-red-500">Service.</span>
                        </h2>
                      </div>
                      <p
                        className="text-gray-500 wow fadeInUp text-base"
                        data-wow-delay=".5s"
                      >
                        It's the perfect dining experience where every dish is
                        crafted with fresh, high-quality ingredients.
                      </p>

                      <div className="icon-area mt-6">
                        <div
                          className="icon-items flex items-start mb-4 wow fadeInUp"
                          data-wow-delay=".3s"
                        >
                          <div className="icon">
                            <CoffeeOutlined />
                          </div>
                          <div className="content">
                            <h4 className="text-xl font-semibold">
                              super quality food
                            </h4>
                            <p className="text-gray-600">
                              A team of dreamers and doers build unique
                              interactive music and art.
                            </p>
                          </div>
                        </div>
                        <div
                          className="icon-items flex items-start wow fadeInUp"
                          data-wow-delay=".5s"
                        >
                          <div className="icon mr-4">
                            <CoffeeOutlined />
                          </div>
                          <div className="content">
                            <h4 className="text-xl font-semibold">
                              well reputation
                            </h4>
                            <p className="text-gray-600">
                              A team of dreamers and doers build unique
                              interactive music and art.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="info-area flex items-center mt-6">
                        <a
                          href="about.html"
                          className="theme-btn bg-red-500 text-white px-6 py-3 rounded-lg transition duration-300 hover:bg-red-600 wow fadeInUp"
                          data-wow-delay=".3s"
                        >
                          more about us
                        </a>
                        <div
                          className="info-content ml-6 wow fadeInUp"
                          data-wow-delay=".5s"
                        >
                          <span className="text-lg font-semibold">
                            BRENDON GARREY
                          </span>
                          <h6 className="text-gray-600">
                            Customer’s experience is our highest priority.
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section
          className="main-cta-banner-2 section-padding bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url('/images/main-cta-bg-2.jpg')",
          }}
        >
          <div className="tomato-shape-left animate-bounce">
            <img src="/images/tomato.png" alt="shape-img" />
          </div>
          <div className="chili-shape-right animate-bounce">
            <img src="/images/chilli.png" alt="shape-img" />
          </div>
          <div className="container mx-auto">
            <div className="main-cta-banner-wrapper-2 flex items-center justify-between mx-[129px]">
              <div className="mb-0">
                <span className="text-yellow-500 font-medium text-2xl animate-fadeInUp">
                  crispy, every bite taste
                </span>
                <h2
                  className="text-white animate-fadeInUp mt-2 font-bold text-5xl sm:text-6xl lg:text-7xl"
                  style={{ animationDelay: "0.3s" }}
                >
                  30 minutes fast <br />
                  <span className="text-yellow-500">delivery</span> challenge
                </h2>
              </div>
              <button
                className="theme-btn bg-white animate-fadeInUp py-3 rounded-lg transition duration-300 hover:bg-gray-100 flex items-center mt-2"
                style={{ animationDelay: "0.5s" }}
              >
                <span className="flex items-center">
                  <span className="button-icon mr-2">
                    <i className="flaticon-delivery text-lg"></i>
                  </span>
                  <span className="button-text">order now</span>
                </span>
              </button>
              <div className="delivery-man">
                <img
                  src="/images/delivery-man-2.png"
                  alt="img"
                  className="w-full h-auto max-h-[200px]"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="about-food-section bg-about py-16">
        <div className="container mx-auto px-4">
          <div className="bg-about">
            <div className="text-center mb-10">
              <span className="block text-lg sm:text-xl text-red-500 font-medium wow">
                about our food
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold text-gray-800 mt-2 wow fadeInUp">
                hot delicious item
              </h2>
            </div>
            <ul className="flex flex-wrap justify-center space-x-4 mb-8">
              {/* Điều chỉnh cho responsive */}
              <li
                className="wow fadeInUp border-2 py-2 px-6 sm:px-10 md:px-12 lg:px-14 rounded-2xl shadow-sm hover:shadow-lg cursor-pointer transition ease-in-out delay-150 hover:bg-yellow-500 hover:-translate-y-1 hover:scale-110 duration-300"
                data-wow-delay=".7s"
              >
                <a
                  href="#burger"
                  className="text-sm sm:text-lg text-gray-700 hover:text-gray-900"
                >
                  burger
                </a>
              </li>
              {/* Tương tự cho các item khác */}
              <li
                className="wow fadeInUp border-2 py-2 px-6 sm:px-10 md:px-12 lg:px-14 rounded-2xl shadow-sm hover:shadow-lg cursor-pointer transition ease-in-out delay-150 hover:bg-yellow-500 hover:-translate-y-1 hover:scale-110 duration-300"
                data-wow-delay=".7s"
              >
                <a
                  href="#burger"
                  className="text-sm sm:text-lg text-gray-700 hover:text-gray-900"
                >
                  burger
                </a>
              </li>
              <li
                className="wow fadeInUp border-2 py-2 px-6 sm:px-10 md:px-12 lg:px-14 rounded-2xl shadow-sm hover:shadow-lg cursor-pointer transition ease-in-out delay-150 hover:bg-yellow-500 hover:-translate-y-1 hover:scale-110 duration-300"
                data-wow-delay=".7s"
              >
                <a
                  href="#burger"
                  className="text-sm sm:text-lg text-gray-700 hover:text-gray-900"
                >
                  burger
                </a>
              </li>
            </ul>

            <div className="tab-content  cursor-pointer ">
              <div id="chicken" className="tab-pane fade show active">
                <div className="description-items">
                  <div className="flex flex-wrap justify-center ">
                    {/* Cấu trúc responsive cho từng item */}
                    <div
                      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8 wow fadeInUp "
                      data-wow-delay=".3s"
                    >
                      <div className="about-food-items hover:bg-white text-center rounded-2xl py-8 px-3 group relative overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg">
                        <div className="food-image mb-4">
                          <img
                            src="/images/about-food/pizza.png"
                            alt="food-img"
                            className="w-3/4 h-auto mx-auto p-3 rounded-lg"
                          />
                        </div>
                        <div className="food-content">
                          <h3 className="text-lg sm:text-xl font-semibold">
                            <a
                              href="shop-single.html"
                              className="hover:text-gray-900"
                            >
                              Chicago Deep Pizza
                            </a>
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600 mt-2">
                            It's the perfect dining experience where Experience
                            quick and efficient
                          </p>
                        </div>
                      </div>
                      
                    </div>
                    <div
                      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8 wow fadeInUp "
                      data-wow-delay=".3s"
                    >
                      <div className="about-food-items hover:bg-white text-center rounded-2xl py-8 px-3 group relative overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg">
                        <div className="food-image mb-4">
                          <img
                            src="/images/about-food/pizza.png"
                            alt="food-img"
                            className="w-3/4 h-auto mx-auto p-3 rounded-lg"
                          />
                        </div>
                        <div className="food-content">
                          <h3 className="text-lg sm:text-xl font-semibold">
                            <a
                              href="shop-single.html"
                              className="hover:text-gray-900"
                            >
                              Chicago Deep Pizza
                            </a>
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600 mt-2">
                            It's the perfect dining experience where Experience
                            quick and efficient
                          </p>
                        </div>
                      </div>
                      
                    </div>
                    <div
                      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8 wow fadeInUp "
                      data-wow-delay=".3s"
                    >
                      <div className="about-food-items hover:bg-white text-center rounded-2xl py-8 px-3 group relative overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg">
                        <div className="food-image mb-4">
                          <img
                            src="/images/about-food/pizza.png"
                            alt="food-img"
                            className="w-3/4 h-auto mx-auto p-3 rounded-lg"
                          />
                        </div>
                        <div className="food-content">
                          <h3 className="text-lg sm:text-xl font-semibold">
                            <a
                              href="shop-single.html"
                              className="hover:text-gray-900"
                            >
                              Chicago Deep Pizza
                            </a>
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600 mt-2">
                            It's the perfect dining experience where Experience
                            quick and efficient
                          </p>
                        </div>
                      </div>
                      
                    </div>
                    <div
                      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8 wow fadeInUp "
                      data-wow-delay=".3s"
                    >
                      <div className="about-food-items hover:bg-white text-center rounded-2xl py-8 px-3 group relative overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg">
                        <div className="food-image mb-4">
                          <img
                            src="/images/about-food/pizza.png"
                            alt="food-img"
                            className="w-3/4 h-auto mx-auto p-3 rounded-lg"
                          />
                        </div>
                        <div className="food-content">
                          <h3 className="text-lg sm:text-xl font-semibold">
                            <a
                              href="shop-single.html"
                              className="hover:text-gray-900"
                            >
                              Chicago Deep Pizza
                            </a>
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600 mt-2">
                            It's the perfect dining experience where Experience
                            quick and efficient
                          </p>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="food-banner-section section-padding section-bg pt-0 sm:px-4 md:px-8 lg:px-[102px]">
        <div className="container mx-auto">
          <div className="flex flex-col xl:flex-row justify-center xl:space-x-4 space-y-5 xl:space-y-0">
            {/* First Block */}
            <div className="xl:w-7/12 lg:w-9/12 w-full px-3">
              <div
                className="burger-banner-items bg-cover bg-center text-center rounded-lg"
                style={{ backgroundImage: "url('/images/banner/burger-bg.png')" }}
              >
                <div className="burger-content text-center py-10">
                  <h3 className="text-5xl sm:text-5xl sm:font-bold">today</h3>
                  <h2 className="text-7xl sm:text-7xl font-bold">special</h2>
                  <h4 className="text-lg sm:text-xl mt-2">
                    <a href="shop.html" className="text-white ">
                      beef <span className="font-bold">burger</span>
                    </a>
                  </h4>
                </div>
                <div className="burger-image">
                  <img
                    src="/images/food/big-burger.png"
                    alt="food-img"
                    className="mx-auto max-w-full h-auto"
                  />
                </div>
                <div className="text-shape mt-4">
                  <img
                    src="/images/shape/pizza-text-2.png"
                    alt="shape-img"
                    className="mx-auto"
                  />
                </div>
                <div className="burger-text mt-2">
                  <img
                    src="/images/shape/burger-text.png"
                    alt="shape-img"
                    className="mx-auto"
                  />
                </div>
              </div>
            </div>

            {/* Second Block */}
            <div className="xl:w-5/12 lg:w-9/12 w-full px-3">
              <div
                className="single-offer-items bg-cover bg-center p-5 relative rounded-lg style-2"
                style={{ backgroundImage: "url('/images/banner/pepsi-bg.png')" }}
              >
                <div className="offer-content text-white">
                  <h5 className="text-xl">crispy, every bite taste</h5>
                  <h3 className="text-2xl font-bold mt-2">
                    FAST FOOD <br />
                    MEAL
                  </h3>
                  <p className="mt-4">
                    The mouth-watering aroma of <br />
                    sizzling burgers
                  </p>
                  <a
                    href="shop-single.html"
                    className="theme-btn mt-4 inline-block bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  >
                    order now
                  </a>
                </div>
                <div className="offer-img absolute bottom-0 right-0">
                  <img
                    src="/images/offer/50percent-off-3.png"
                    alt="shape-img"
                    className="max-w-[100px] lg:max-w-[150px] h-auto"
                  />
                </div>
                <div className="roller-box absolute bottom-0 right-14">
                  <img
                    src="/images/food/roller-box.png"
                    alt="food-img"
                    className="max-w-[400px] lg:max-w-[400px] h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-about">
        <section className="today-best-sale fix mx-4 md:mx-10 lg:mx-[102px] p-2">
          <div className="today-best-sale-wrapper">
            <div className="flex flex-col lg:flex-row -mx-2">
              <div className="w-full lg:w-8/12 px-2">
                <div className="swiper today-best-sale-image-slider">
                  <div className="array-button flex justify-between mb-4">
                    <button className="array-next">
                      <i className="far fa-long-arrow-right"></i>
                    </button>
                    <button className="array-prev">
                      <i className="far fa-long-arrow-left"></i>
                    </button>
                  </div>
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div
                        className="today-best-sale-image bg-cover h-48 md:h-64 lg:h-80"
                        style={{
                          backgroundImage: `url('../..//images/banner/best-sale-4.jpg')`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-2 p-2">
                <div
                  className="best-sale-content style-2 bg-cover h-full"
                  style={{ backgroundImage: "url('../..//images/shape.png')" }}
                >
                  <div className="burger-shape">
                    <img
                      src="../..//images/shape/fry-shape-4.png"
                      alt="shape-img"
                      className="w-full"
                    />
                  </div>
                  <div className="fry-shape">
                    <img
                      src="../..//images/shape/burger-shape-4.png"
                      alt="shape-img"
                      className="w-full"
                    />
                  </div>
                  <h4 className="wow fadeInUp text-xl lg:text-2xl">
                    Deal Of The Day
                  </h4>
                  <h2
                    className="wow fadeInUp text-2xl lg:text-3xl"
                    data-wow-delay=".3s"
                  >
                    TODAY'S the hamburger' DAY
                  </h2>
                  <h3
                    className="wow fadeInUp text-lg lg:text-xl"
                    data-wow-delay=".5s"
                  >
                    <span>special price</span> $55
                  </h3>
                  <p
                    className="wow fadeInUp text-sm lg:text-base"
                    data-wow-delay=".7s"
                  >
                    Savor the perfect symphony of flavors. It's the perfect
                    dining experience where you can enjoy quick and efficient
                    service with our signature hamburger, a culinary delight.
                  </p>
                  <div
                    className="button-area wow fadeInUp"
                    data-wow-delay=".9s"
                  >
                    <div className="theme-btn bg-transparent">
                      <span className="button-content-wrapper flex items-center">
                        <span className="button-icon">
                          <i className="flaticon-delivery"></i>
                        </span>
                        <span className="button-text">order now</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="team-section section-padding bg-about fix">
        <div className="container mx-auto px-4">
          <div className="section-title text-center mb-8">
            <span className="wow fadeInUp text-gray-600">about our food</span>
            <h2
              className="wow fadeInUp text-7xl font-bold mt-2"
              data-wow-delay=".3s"
            >
              MEET OUR EXPERT CHEFS
            </h2>
          </div>
          <div className="flex flex-wrap -mx-2 mt-2 ">
            {[
              {
                name: "Leslie Alexander",
                role: "head chef",
                image:
                  "/images/team/01.jpg",
              },
              {
                name: "Henry Lucas",
                role: "sr table manager",
                image:
                  "/images/team/02.jpg",
              },
              {
                name: "Mateo Levi",
                role: "senior cooker",
                image:
                  "/images/team/03.jpg",
              },
            ].map((member, index) => (
              <div
                className="w-full lg:w-1/3 md:w-1/2 px-2 mb-4 wow fadeInUp "
                data-wow-delay={`${0.3 + index * 0.2}s`}
                key={member.name}
              >
                <div className="single-team-items about rounded-lg overflow-hidden p-16">
                  <div className="team-image relative">
                    <img
                      src={`${member.image}`}
                      alt="team-img"
                      className="w-full h-64 object-cover pt-6"
                    />
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-2 -z-10 bg-black bg-opacity-50">
                      <a href="#" className="text-white">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="text-white">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="text-white">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href="#" className="text-white">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </div>
                  </div>
                  <div className="team-content text-center p-4">
                    <p className="text-sm text-gray-500">{member.role}</p>
                    <h3 className="mt-2">
                      <div className="text-lg font-semibold  text-gray-800 hover:text-blue-500">
                        {member.name}
                      </div>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="team-button text-center mt-5 wow fadeInUp"
            data-wow-delay=".4s"
          >
            <a
              href="team.html"
              className="theme-btn py-4 px-7 text-white  rounded hover:bg-blue-600 transition"
            >
              meet our team
            </a>
          </div>
        </div>
      </section>

      <section
        className="food-processing-section section-padding fix bg-cover"
        style={{ backgroundImage: "url('../..//images/shape/about-food-bg.png')" }}
      >
        <div className="container mx-auto">
          <div className="section-title text-center mb-8">
            <span className="wow fadeInUp text-2xl">food processing</span>
            <h2
              className="wow fadeInUp text-7xl md:text-7xl font-bold"
              data-wow-delay=".3s"
            >
              how we serve you?
            </h2>
          </div>
          <div className="food-processing-wrapper">
            <div className="flex flex-wrap -mx-4">
              <div
                className="xl:w-1/3 md:w-1/2 px-4 wow fadeInUp"
                data-wow-delay=".3s"
              >
                <div className="food-processing-items style-2 text-center">
                  <div className="food-processing-image">
                    <img
                      src="../..//images/choose/01.png"
                      alt="img"
                      className="mx-auto"
                    />
                    <div className="number">
                      <span className="text-2xl">01</span>
                    </div>
                  </div>
                  <div className="food-processing-content pb-10">
                    <h3 className="text-lg font-semibold">cooking with care</h3>
                    <p className="text-sm">
                      It's the perfect dining experience where Experience quick
                      and efficient.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="xl:w-1/3 md:w-1/2 px-4 wow fadeInUp"
                data-wow-delay=".5s"
              >
                <div className="food-processing-items style-2 text-center active">
                  <div className="food-processing-image">
                    <img
                      src="../..//images/choose/02.png"
                      alt="img"
                      className="mx-auto"
                    />

                    <div className="number">
                      <span className="text-2xl">02</span>
                    </div>
                  </div>
                  <div className="food-processing-content pb-10">
                    <h3 className="text-lg font-semibold">quickly delivery</h3>
                    <p className="text-sm">
                      It's the perfect dining experience where Experience quick
                      and efficient.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="xl:w-1/3 md:w-1/2 px-4 wow fadeInUp"
                data-wow-delay=".7s"
              >
                <div className="food-processing-items style-2 text-center">
                  <div className="food-processing-image">
                    <img
                      src="../..//images/choose/03.png"
                      alt="img"
                      className="mx-auto"
                    />

                    <div className="number">
                      <span className="text-2xl">03</span>
                    </div>
                  </div>
                  <div className="food-processing-content pb-10">
                    <h3 className="text-lg font-semibold">choose food</h3>
                    <p className="text-sm">
                      It's the perfect dining experience where Experience quick
                      and efficient.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial-section relative section-padding section-bg">
        <div className="burger-shape absolute top-0 left-0">
          <img src="../..//images/shape/burger-shape-3.png" alt="burger-shape" />
        </div>
        <div className="fry-shape absolute top-0 right-0">
          <img src="../..//images/shape/fry-shape-2.png" alt="fry-shape" />
        </div>
        <div className="pizza-shape absolute bottom-0 left-0">
          <img src="../..//images/shape/pizzashape.png" alt="pizza-shape" />
        </div>
        <div className="container mx-auto">
          <div className="testimonial-wrapper style-2">
            <div className="testimonial-items text-center">
              <div className="swiper testimonial-content-slider">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="testimonial-content p-6 rounded ">
                      <div className="client-info mb-4">
                        <h4 className="text-lg font-bold">Piter Bowman</h4>
                        <h5 className="text-sm text-gray-500">
                          Business CEO & co-founder
                        </h5>
                      </div>
                      <h3 className="text-base italic mb-4">
                        “Thank you for dinner last night. It was amazing!! I
                        have to say it’s the best meal I’ve had in quite some
                        time. Will definitely be seeing more next year.”
                      </h3>
                      <div className="star text-yellow-500">
                        <span className="fas fa-star"></span>
                        <span className="fas fa-star"></span>
                        <span className="fas fa-star"></span>
                        <span className="fas fa-star"></span>
                        <span className="fas fa-star"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="swiper testimonial-image-slider mx-auto">
                <div className="swiper-wrapper flex justify-center">
                  <div className="swiper-slide mx-4">
                    <div className="client-image-item">
                      <div
                        className="client-img bg-cover bg-center h-24 w-24 rounded-full"
                      >
                        <img src="../..//images/client/01.jpg" alt="" className="rounded-full"/>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide mx-4">
                    <div className="client-image-item">
                      <div
                        className="client-img bg-cover bg-center h-24 w-24 rounded-full"
                      >
                        <img src="../..//images/client/02.jpg" alt="" className="rounded-full"/>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide mx-4">
                    <div className="client-image-item">
                      <div
                        className="client-img bg-cover bg-center h-24 w-24 rounded-full"
                      >
                        <img src="../..//images/client/03.jpg" alt="" className="rounded-full"/>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="booking-section mt-0 section-padding bg-cover bg-center mx-auto sm:px-4 lg:px-16"
        style={{
          backgroundImage: "url('../..//images/main-bg.jpg')",
        }}
      >
        <div className="container mx-auto">
          <div className="booking-wrapper mx-auto lg:mx-[102px]">
            <div className="flex flex-wrap justify-between items-center">
              {/* Cột trái */}
              <div className="w-full lg:w-2/4">
                <div className="booking-content">
                  <div className="section-title">
                    <span className="block text-lg text-yellow-500 animate-fadeInUp">
                      crispy, every bite taste
                    </span>
                    <h2
                      className="text-white text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight animate-fadeInUp"
                      style={{ animationDelay: ".3s" }}
                    >
                      need booking? <br />
                      reserve your table?
                    </h2>
                  </div>
                  <div
                    className="icon-items flex items-center space-x-4 animate-fadeInUp"
                    style={{ animationDelay: ".5s" }}
                  >
                    <div className="icon text-2xl text-yellow-500">
                      <i className="flaticon-phone-call-2"></i>
                    </div>
                    <div className="content">
                      <h5 className="text-lg text-gray-200">
                        24/7 Support center
                      </h5>
                      <h3 className="text-3xl sm:text-5xl font-bold pt-1">
                        <a
                          href="tel:+1718-904-4450"
                          className="text-yellow-400"
                        >
                          +1718-904-4450
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cột phải */}
              <div
                className="w-full lg:w-5/12 mt-5 lg:mt-0 animate-fadeInUp"
                style={{ animationDelay: ".4s" }}
              >
                <div
                  className="booking-contact px-5  bg-cover bg-center rounded-md shadow-lg"
                  style={{
                    backgroundImage:
                      "url('assets/img/shape/booking-shape.png')",
                  }}
                >
                  <h4 className="text-center text-gray-400 text-xl pb-5 mt-7">
                    create a reservation
                  </h4>
                  <div className="booking-items space-y-4">
                    <div className="form-clt">
                      <select className="form-select w-full rounded-lg p-3 form-input  border-none outline-none">
                        <option>No of person</option>
                        <option value="1">1 person</option>
                        <option value="2">2 persons</option>
                        <option value="3">3 persons</option>
                      </select>
                    </div>
                    <div className="form-clt relative">
                      <input
                        type="text"
                        name="number"
                        id="number"
                        placeholder="Phone number"
                        className="form-input w-full rounded-lg p-3 bg-gray-100 border border-gray-300"
                      />
                      <div className="icon absolute inset-y-0 right-3 flex items-center text-gray-400">
                        <i className="fas fa-phone"></i>
                      </div>
                    </div>
                    <div className="form-clt">
                      <input
                        type="date"
                        id="calendar"
                        name="calendar"
                        className="form-input w-full rounded-lg p-3 bg-gray-100 border border-gray-300"
                      />
                    </div>
                    <div className="form-clt">
                      <div className="theme-btn bg-yellow-500 text-center block w-full py-4  sm:py-5 my-8  text-white font-semibold rounded-lg">
                        booking now
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      
      <div className="instagram-banner-slider">
      <div className="flex justify-center">
        {visibleImages.map((image, index) => (
          <div key={index} className="instagram-banner-items w-full">
            <div className="banner-image relative">
              <img
                src={image}
                alt="food-img"
                className={` ${imageCount === 1 ? 'w-full h-full' : imageCount === 3 ? 'w-full' : imageCount === 5 ? 'w-full h-auto' : 'w-[300px] h-[200px]'}`}
              />
              <a
                href={image}
                className="icon absolute inset-0 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
              >
                <SearchOutlined />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default About;
