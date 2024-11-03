import { MenuFoldOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useCallback, useState } from "react";
import CateContent from "./components/CateContent";
import ProContent from "./components/ProContent";
import SiderOder from "./components/SiderOder";


interface IState {
    loading: boolean;
    loadingBtn: boolean;
    refresh: boolean;
    products: any[];
    showSider: boolean;
}

const initState: IState = {
    loading: false,
    loadingBtn: false,
    refresh: false,
    products: [],
    showSider: false,
}

const OrderPage = () => {
    const [state, setState] = useState<IState>(initState);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setState(prev => ({ ...prev, loading: true }));
    //             const res = await apiGetProForOrder();
    //             let items = [];
    //             items = res.data.map((i: any) => {
    //                 if (i.product_details.length == 0) {
    //                     return [];
    //                 }
    //                 return i.product_details.map((x: any) => ({ ...x, image: x.images.length > 0 ? x.images[0].name : '', name: i.name }));
    //             })

    //             setState(prev => ({ ...prev, loading: false, products: items[0] }));
    //         } catch (error) {
    //             console.log(error);
    //             setState(prev => ({ ...prev, loading: false }));
    //         }
    //     }
    //     fetchData();
    // }, [state.refresh]);

    const handleToggleSider = useCallback((e: boolean) => {
        setState(prev => ({ ...prev, showSider: e }));
    }, []);

    return <>
        <Layout className="min-h-[100vh]">
            <Content className="bg-[#F5F5F5]">
                <Layout>
                    <Header className="bg-transparent mt-8 mb-2  max-sm:px-4">
                        <div className="flex items-center justify-between   ">
                            <div className="text-xl font-bold">YaGI ORDER</div>
                            <Input
                                prefix={<SearchOutlined className="text-[#F8B602]" />}
                                placeholder="Tìm kiếm món ăn tại đây"
                                className="w-[513px] max-md:hidden"
                                size="large"
                            />
                            <MenuFoldOutlined
                                hidden={!state.showSider}
                                className="text-2xl cursor-pointer"
                            />
                        </div>
                        <Input
                            prefix={<SearchOutlined className="text-[#F8B602]" />}
                            placeholder="Tìm kiếm món ăn tại đây"
                            className="w-full md:hidden"
                            size="large"
                        />
                    </Header>
                    <Content className="max-sm:px-4 sm:mx-[50px]">
                        {/* Danh mục */}
                        <CateContent />
                        {/* Sản phẩm */}
                        <ProContent />
                    </Content>
                </Layout>
            </Content>
            {/* Sider order */}
            <SiderOder onToggle={handleToggleSider} />
        </Layout>
    </>
}

export default OrderPage;