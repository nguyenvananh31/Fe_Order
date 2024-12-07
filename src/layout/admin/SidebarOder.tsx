import { CloseOutlined, InboxOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import Sider from "antd/es/layout/Sider";
import { TabsProps } from "antd/lib";
import { useCallback, useEffect, useRef, useState } from "react";
import { Subscription } from "rxjs";
import { useIsMobile } from "../../hooks/useIsMobile";
import { BaseEventPayload, EventBusName } from "../../utils/event-bus";
import EventBus from "../../utils/event-bus/event-bus";
import OrderCartComponent from "./components/OrderCartComponent";

interface ISate {
    loading: boolean;
    orderId?: number;
    data?: any
    loadingBtn: boolean;
    isOpenRight: boolean;
    refresh: boolean;
}

const innitState: ISate = {
    loading: false,
    loadingBtn: false,
    isOpenRight: false,
    refresh: false
}

export default function SidebarOder() {

    const isMobile = useIsMobile();
    const [state, setState] = useState<ISate>(innitState);
    const subscriptions = useRef(new Subscription());

    // useEffect(() => {
    //     if (!state.orderId) {
    //         return;
    //     }
    //     const fetchData = async () => {
    //         try {
    //             setState(prev => ({ ...prev, loading: true }));
    //             const res = await apiGetTableDetail(state.orderId!);
    //             setState(prev => ({ ...prev, loading: false, data: res.table }));
    //         } catch (error) {
    //             console.log(error);
    //             setState(prev => ({ ...prev, loading: false }))
    //         }
    //     }
    //     fetchData();
    // }, [state.refresh])

    useEffect(() => {
        registerEventBus();

        return () => {
            subscriptions.current.unsubscribe();
        };
    }, []);

    const registerEventBus = () => {
        subscriptions.current = new Subscription();
        subscriptions.current.add(
            EventBus.getInstance().events.subscribe((data: BaseEventPayload<{ isOpen: boolean, orderId: number }>) => {
                if (data.type === EventBusName.ON_SHOW_SiDE_ORDER) {
                    setState(prev => {
                        if (data.payload.orderId != prev.orderId) {
                            return ({ ...prev, isOpenRight: data.payload.isOpen, orderId: data.payload.orderId, refresh: !prev.refresh });
                        }
                        return ({ ...prev, isOpenRight: data.payload.isOpen });
                    });
                }
            })
        );
    };

    const closeNavRight = useCallback(() => {
        setState(prev => ({ ...prev, isOpenRight: false }))
    }, []);

    const items: TabsProps['items'] = [
        // {
        //     key: '1',
        //     label: <span className="pr-2">Giỏ hàng</span>,
        //     icon: <ShoppingCartOutlined />,
        //     children: <ProCartComponent id={state.orderId} showToastMes={showToast} />,
        // },
        {
            key: '2',
            label: <span className="pr-2">Danh sách món ăn</span>,
            icon: <InboxOutlined />,
            children: <OrderCartComponent id={state.orderId}/>,
        },
    ];

    return (
        <>
        <Sider
            collapsed={!state.isOpenRight}
            collapsedWidth={0}
            width={isMobile ? '100%' : 350}
            className="drop-shadow-primary"
            style={{
                position: "sticky",
                top: 0,
                left: 0,
                bottom: 0,
            }}
            theme="light"
        >
                <Tabs
                    defaultActiveKey="2"
                    items={items}
                    size="large"
                    tabBarExtraContent={{ left: <CloseOutlined onClick={closeNavRight} className="cursor-pointer p-2" /> }}
                    className="pt-4 h-[100vh]"
                    style={{
                        height: '100%'
                    }}
                />
        </Sider>
        </>
    )
}