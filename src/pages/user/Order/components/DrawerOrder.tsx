import { CloseOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { memo } from "react"
import RightContent from "./RightContent";

interface IProps {
    onToggleDrawer: () => void;
    isMobile: boolean;
    open: boolean;
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
}

const DrawerOrder = (props: IProps) => {
    
    return <Drawer
        title={<span className="text-[#00813D] text-2xl font-bold">YaGI ORDER</span>}
        placement={'right'}
        closeIcon={false}
        onClose={props.onToggleDrawer}
        open={props.open}
        width={props.isMobile ? '100%' : 396}
        extra={
            <CloseOutlined onClick={props.onToggleDrawer} />
        }
        styles={{
            body: {
                padding: '16px 0',
                overflowY: 'auto',
                overflowX: 'hidden',
                msOverflowStyle: 'none', /* Ẩn thanh cuộn cho IE và Edge */
                scrollbarWidth: 'none'   /* Ẩn thanh cuộn cho Firefox */
            }
        }}

    >
        <RightContent props={props} />
    </Drawer>
}

export default memo(DrawerOrder);



