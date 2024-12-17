import {
  ArrowLeftOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";
import { List } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import ItemProduct from "../../../layout/users/component/ItemProduct/ItemProduct";
import { apiGetCateClient, apiGetProDetail } from "../Home/utils/home.service";
import "./css/products.css";
import { apiGetProByCate } from "./utils/cate.service";

// const { Option } = Select;

interface IState {
  loading: boolean;
  loadingCate: boolean;
  loadingPro: boolean;
  cates: any[];
  pros: any[];
  refresh: boolean;
  pageSize: number;
  pageIndex: number;
  total: number;
  cateActive: number;
}

const initState: IState = {
  loading: false,
  loadingCate: true,
  loadingPro: true,
  cates: [],
  pros: [],
  refresh: false,
  pageIndex: 1,
  pageSize: 12,
  total: 0,
  cateActive: 0
}

function ListProducts() {

  const [state, setState] = useState<IState>(initState);

  const paginateNumber = useMemo(() => Math.ceil(state.total / state.pageSize), [state.pros]);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetProDetail({
          per_page: state.pageSize,
          page: state.pageIndex,
        });
        setState(prev => ({ ...prev, pros: res.data, loadingPro: false, total: res.total }));
      } catch (error) {
        console.error('Error fetching products:', error);
        setState(prev => ({ ...prev, pros: [], loadingPro: false }));
      }
    })()
  }, [state.refresh]);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetCateClient();
        setState(prev => ({ ...prev, cates: res.data, loadingCate: false }));
      } catch (error) {
        console.error('Error fetching cates:', error);
        setState(prev => ({ ...prev, cates: [], loadingCate: false }));
      }
    })()
  }, [state.refresh]);

  const handleClickCate = useCallback((id: number) => async () => {
    getProByCateId(id);
  }, []);

  const getProByCateId = useCallback(async (id: number) => {
    try {
      setState(prev => ({ ...prev, loadingPro: true, cateActive: id }));
      const res = await apiGetProByCate(id, {
        per_page: state.pageSize,
        page: 1,
      });
      setState(prev => ({ ...prev, loadingPro: false, pros: res.data, total: res.data.length, pageIndex: 1 }));
    } catch (error) {
      console.error('Error fetching product:', error);
      setState(prev => ({ ...prev, loadingPro: false, pros: [], total: 0 }));
    }
  }, []);

  const handleChagePage = useCallback((pageIndex: number) => () => {
    setState(prev => ({ ...prev, pageIndex, refresh: prev.cateActive ? prev.refresh : !prev.refresh }));
    if (state.cateActive) {
      getProByCateId(state.cateActive);
    }
  }, [state.cateActive]);

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
                    <h4 className="text-lg font-semibold">Danh mục</h4>
                  </div>
                  <div className="widget-categories">
                    <ul className="space-y-4">
                      {
                        state.cates.length > 0 &&
                        state.cates.map(i => (
                          <li key={i.id}>
                            <span
                              className="flex items-center space-x-2"
                            >
                              <i className="flaticon-burger"></i>
                              <span className={`cursor-pointer ${state.cateActive == i.id ? 'text-[#00813D]' : ''}`} onClick={handleClickCate(i.id)}>{i.name}</span>
                            </span>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
                <div className="single-sidebar-widget mb-8">
                  <div className="wid-title">
                    <h4 className="text-lg font-semibold">Lọc theo kích thước</h4>
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
                        Nhỏ
                      </label>
                    </div>
                  </div>
                </div>
                <div className="single-sidebar-widget">
                  <div className="wid-title">
                    <h4 className="text-lg font-semibold">Món mới</h4>
                  </div>
                  <div className="popular-food-posts">
                    {/* <div className="single-post-item flex space-x-4">
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
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full lg:w-3/4 sm:order-2 lg:order-2 ">
              <div className="woocommerce-notices-wrapper mb-8 py-3">
                <div className="product-showing flex justify-between items-center">
                  {/* <h5>
                    <div
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
                    </div>
                  </h5> */}
                  <h5 className="text-lg">
                    Hiển thị <span>{(state.pageIndex - 1) * state.pageSize}
                      –
                      {(state.pageIndex * state.pageSize) < state.total ? (state.pageIndex * state.pageSize) : state.total}
                    </span> của {state.total} món
                  </h5>
                </div>
                <div className="form-clt flex items-center space-x-4">
                  {/* <Select
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
                  </Select> */}

                  <div className="form-clt flex items-center space-x-4 cursor-pointer">
                    {/* <Select
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
                    </Select> */}
                  </div>
                </div>
              </div>

              {/* Products */}
              <List
                loading={state.loadingPro}
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 2,
                  lg: 3,
                  xl: 4,
                  xxl: 4,
                }}
                dataSource={state.pros}
                renderItem={(item) => (
                  <List.Item>
                    <ItemProduct product={item} />
                  </List.Item>
                )}
              />

              {/* Pagination */}
              {
                state.total > 0 && (
                  <div className="page-nav-wrap mt-8 text-center">
                    <ul className="inline-flex space-x-2">
                      <li>
                        <p className="page-numbers cursor-pointer">
                          <ArrowLeftOutlined />
                        </p>
                      </li>
                      {
                        [...Array(paginateNumber)].map((_: any, index: number) => (
                          <li key={index}>
                            <p onClick={handleChagePage(index + 1)} className={`page-numbers cursor-pointer ${index + 1 == state.pageIndex ? 'text-[white]' : ''}`} style={{ background: index + 1 == state.pageIndex ? '#00813D' : '' }}>{index + 1}</p>
                          </li>
                        ))
                      }
                      <li>
                        <p className="page-numbers cursor-pointer">
                          <ArrowRightOutlined />
                        </p>
                      </li>
                    </ul>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ListProducts;
