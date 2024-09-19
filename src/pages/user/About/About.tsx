import { CoffeeOutlined } from "@ant-design/icons";
import "../Product/css/products.css";

const About = () => {
  return (
    <>
      <div className="w-full bg-about ">
        <div className="lg:mx-[196px] md:mx-3">
          <section className="about-section py-16 ">
            <div className="container mx-auto">
              <div className="about-wrapper">
                <div className="flex flex-wrap ">
                  <div
                    className="w-full lg:w-1/2 lg:mb-0 wow fadeInUp"
                    data-wow-delay=".3s"
                  >
                    <div className="about-image relative md:m-3 md:p-3 md:mb-16">
                      <img
                        src="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
                        alt="about-img"
                        className="lg:w-full lg:h-auto lg:p-7 md:ml-16 sm:w-full "
                      />
                      <div className="burger-text absolute top-0 left-0">
                        <img
                          src="assets/img/about/burger-text.png"
                          alt="shape-img"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 lg:mt-4 pr-9 md:pl-3 about-reponsive">
                    <div className="about-content">
                      <div className="section-title">
                        <span className="text-2xl font-semibold text-gray-600 wow fadeInUp ">
                          about our food
                        </span>
                        <h2
                          className="text-7xl font-bold wow fadeInUp mt-4"
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
                        crafted with fresh, high-quality Experience quick and
                        efficient service that ensures your food is servead
                        fresh It's the dining experience where every dish is
                        crafted with fresh, high-quality ingredients
                      </p>
                      <div className="icon-area mt-6">
                        <div
                          className="icon-items flex items-start mb-4 wow fadeInUp"
                          data-wow-delay=".3s"
                        >
                          <div className="icon ">
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
                          className="icon-items flex items-start wow fadeInUp "
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
              "url('../../../../public/images/main-cta-bg-2.jpg')",
          }}
        >
          <div className="tomato-shape-left animate-bounce">
            <img src="assets/img/tomato.png" alt="shape-img" />
          </div>
          <div className="chili-shape-right animate-bounce">
            <img src="assets/img/chilli.png" alt="shape-img" />
          </div>
          <div className="container mx-auto">
            <div className="main-cta-banner-wrapper-2 flex items-center justify-between mx-[129px]">
              <div className=" mb-0">
                <span className="text-yellow-500 font-medium text-2xl animate-fadeInUp">
                  crispy, every bite taste
                </span>
                <h2
                  className="text-white animate-fadeInUp mt-2 font-bold text-7xl"
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
                  <span className="button-text ">order now</span>
                </span>
              </button>
              <div className="delivery-man">
                <img
                  src="assets/img/delivery-man-2.png"
                  alt="img"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
