
import "./css/products.css"
import { List, Select } from "antd";
import { useState } from "react";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DownOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

function ListProducts() {
  const { Option } = Select;

  const [data] = useState([
    {
      id: 1,
      title: "ruti with chiken",
      image:
        "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
      price: 200,
      sale: "-5%",
      priceNew: "$28.50",
    },
    {
      id: 2,
      title: "grilled chiken",
      image:
        "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
      price: 500,
      sale: "-5%",
      priceNew: "$28.50",
    },
    {
      id: 3,
      title: "delicious burger",
      image:
        "https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png",
      price: 400,
      sale: "-5%",
      priceNew: "$28.50",
    },
  ]);
  const [filteredData, setFilteredData] = useState(data);

  // Hàm xử lý sắp xếp và lọc
  const handleChange = (value:any) => {
    const sortedData = [...data].sort((a, b) => {
      if (value === "asc") {
        return a.price - b.price; // Sắp xếp từ bé đến lớn
      } else if (value === "desc") {
        return b.price - a.price; // Sắp xếp từ lớn đến bé
      }
      return 0; // Không thay đổi nếu không có giá trị
    });
    setFilteredData(sortedData);
  };

  const handleFilterByPrice = (price:any) => {
    if (price === "all") {
      setFilteredData(data); // Hiển thị tất cả nếu chọn 'all'
    } else {
      const filtered = data.filter((item) => item.price === parseInt(price));
      setFilteredData(filtered);
    }
  };

  return (
    <>
      <section className="food-category-section fix py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Sidebar - Categories & Filter */}
            <div className="w-full lg:w-1/4 sm:order-1 lg:order-1 mt-5 ml-2">
              <div className="main-sidebar">
                <div className="single-sidebar-widget mb-8">
                  <div className="wid-title">
                    <h4 className="text-lg font-semibold">Categories</h4>
                  </div>
                  <div className="widget-categories">
                    <ul className="space-y-4">
                      <li>
                        <a
                          href="shop-single.html"
                          className="flex items-center space-x-2"
                        >
                          <i className="flaticon-burger"></i>
                          <span>Burger</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="single-sidebar-widget mb-8">
                  <div className="wid-title">
                    <h4 className="text-lg font-semibold">Filter by Size</h4>
                  </div>
                  <div className="filter-size">
                    <div className="input-save flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        name="save-for-next"
                        id="saveForNext"
                      />
                      <label htmlFor="saveForNext" className="text-lg">
                        Small
                      </label>
                    </div>
                  </div>
                </div>
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h4 className="text-lg font-semibold">New Arrival</h4>
                  </div>
                  <div className="popular-food-posts">
                    <div className="single-post-item flex space-x-4">
                      <div
                        className="thumb w-16 h-16 bg-cover bg-center"
                        style={{
                          backgroundImage: `url('assets/img/shop-food/food-1.png')`,
                        }}
                      ></div>
                      <div className="post-content">
                        <h4>
                          <a href="shop-single.html" className="text-lg">
                            Ruti with Chicken
                          </a>
                        </h4>
                        <div className="post-price flex space-x-2">
                          <span className="text-red-500">$30.52</span>
                          <span className="line-through">$28.52</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full lg:w-3/4 sm:order-2 lg:order-2 ">
              <div className="woocommerce-notices-wrapper mb-8 py-3">
                <div className="product-showing flex justify-between items-center">
                  <h5>
                    <a
                      href="shop-left-sidebar.html"
                      className="flex items-center space-x-2"
                    >
                      <span>
                        <img
                          src="assets/img/filter.png"
                          alt="img"
                          className="w-4"
                        />
                      </span>
                      <span className="text-lg">Filtering</span>
                    </a>
                  </h5>
                  <h5 className="text-lg">
                    Showing <span>1–12</span> of 27 results
                  </h5>
                </div>
                <div className="form-clt flex items-center space-x-4">
                  <Select
                    placeholder={<h6>Sort by</h6>} // Sử dụng <h6> cho placeholder
                    className=" lg:w-[135px]"
                    onChange={handleChange}
                    bordered={false}
                    suffixIcon={<DownOutlined />}
                  >
                    <Option value="all">
                      <h6>Sort by</h6>
                    </Option>
                    <Option value="asc">Từ thấp đến cao</Option>
                    <Option value="desc">Từ cao đến thấp</Option>
                  </Select>

                  <div className="form-clt flex items-center space-x-4 cursor-pointer">
                    <Select
                      placeholder={ <span className="current font-semibold text-black">Price</span>}
                      onChange={handleFilterByPrice}
                               className=" lg:w-[115px]"
                      bordered={false}
                      suffixIcon={<DownOutlined className="text-sm "/>}
                    >
                      <Option value="all">
                      <span className="current">Price</span>
                      </Option>
                      <Option value="100">100</Option>
                      <Option value="200">200</Option>
                      <Option value="300">300</Option>
                      <Option value="400">400</Option>
                      <Option value="500">500</Option>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Products */}
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 3,
                  xxl: 3,
                }}
                dataSource={filteredData}
                renderItem={(item) => (
                  <List.Item>
                    <div className="flex flex-wrap lg:w-full">
                      <div className=" md:w-1/2 lg:w-full mx-3 mt-2 mb-8">
                        <div className="catagory-product-card-2 shadow-lg text-center p-4 rounded-xl">
                          <div className="icon mb-4">
                            <HeartOutlined className="text-white hover:text-yellow-500 ml-2 text-2xl w-full h-full " />
                          </div>
                          <div className="catagory-product-image lg:w-56 center mb-4">
                            <img
                              src={item.image}
                              alt="product-img"
                              className="mx-auto"
                            />
                          </div>
                          <div className="catagory-product-content">
                            <div className="catagory-button mb-4">
                              <a
                                className="theme-btn-2 inline-block bg-black text-white px-4 py-2"
                              >
                                <ShoppingCartOutlined className="m-1 text-lg font-sans font-medium" /> Add
                                To Cart
                              </a>
                            </div>
                            <div className="info-price flex text-lg justify-center items-center space-x-2">
                              <p className="text-red-500">{item.sale}</p>
                              <h6 className="text-lg font-semibold">
                                {item.priceNew}
                              </h6>
                              <h5 className="line-through font-bold text-green-800 ">
                                {item.price}
                              </h5>
                            </div>
                            <h4 className="mt-4">
                              <a href="shop-single.html" className="text-lg">
                                {item.title}
                              </a>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </List.Item>
                )}
              />

              {/* Pagination */}
              <div className="page-nav-wrap mt-8 text-center">
                <ul className="inline-flex space-x-2">
                  <li>
                    <a className="page-numbers" href="#">
                      <ArrowLeftOutlined />
                    </a>
                  </li>
                  <li>
                    <a className="page-numbers" href="#">
                      1
                    </a>
                  </li>
                  <li>
                    <a className="page-numbers" href="#">
                      2
                    </a>
                  </li>
                  <li>
                    <a className="page-numbers" href="#">
                      3
                    </a>
                  </li>
                  <li>
                    <a className="page-numbers" href="#">
                      <ArrowRightOutlined />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ListProducts;
