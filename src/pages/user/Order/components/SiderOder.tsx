import { Avatar, Flex } from "antd";
import Sider from "antd/es/layout/Sider";
import { memo } from "react";
import RightContent from "./RightContent";

interface IProps {
    onToggle: (e: boolean) => void;
    onToggleCheckBox: () => void;
    onDelCartPro: (id: number) => void;
    onIncreaseCart: (item: any) => void;
    onDecreaseCart: (item: any) => void;
    onCheckedPro: (ids: number[]) => void;
    onShowPayment: () => void;
    onOrderPro: () => void;
    onFetchBill: () => void;
    cart: any[];
    loading: boolean;
    checked: any[];
    loadingBtn: boolean;
    loadBill: boolean;
    billDetail: any;
    billOnlinePro: any[];
    orderId: string;
    isMobile: boolean;
}

const SiderOrder = (props: IProps) => {

    return <Sider
        onCollapse={props.onToggle}
        breakpoint="xl"
        collapsedWidth={0}
        width={396}
        style={{
            position: "sticky",
            top: 0,
            left: 0,
            bottom: 0,
            height: '100vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            msOverflowStyle: 'none', /* Ẩn thanh cuộn cho IE và Edge */
            scrollbarWidth: 'none'   /* Ẩn thanh cuộn cho Firefox */
        }}
        className="bg-white"
    >
        <div style={{
            position: 'fixed',
            zIndex: 10000,
            backgroundColor: '#ffffff',
            width: '396px'
        }}>
            <Flex justify="space-between" align="center" className="mx-6 my-4">
                <span className="text-[#00813D] text-2xl font-bold">YaGI ORDER</span>
                <Avatar src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' />
            </Flex>
        </div>
        <RightContent props={props} />
    </Sider>
}

export default memo(SiderOrder);