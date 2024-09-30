import { CloseOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Sider from "antd/es/layout/Sider";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useCallback, useEffect, useRef, useState } from "react";
import { Subscription } from "rxjs";
import EventBus from "../../utils/event-bus/event-bus";
import { BaseEventPayload, EventBusName } from "../../utils/event-bus";
import { apiGetTableDetail } from "../../pages/admin/Tables/utils/rable.service";

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

    useEffect(() => {
        if (!state.orderId) {
            return;  
        }
        const fetchData = async () => {
            try {
                setState(prev => ({ ...prev, loading: true }));
                const res = await apiGetTableDetail(state.orderId!);
                setState(prev => ({ ...prev, loading: false, data: res.table }));
            } catch (error) {
                console.log(error);
                setState(prev => ({ ...prev, loading: false }))
            }
        }
        fetchData();
    }, [state.refresh])

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
                    setState(prev => ({ ...prev, isOpenRight: data.payload.isOpen, orderId: data.payload.orderId, refresh: !prev.refresh }));
                }
            })
        );
    };

    const closeNavRight = useCallback(() => {
        setState(prev => ({ ...prev, isOpenRight: false }))
    }, []);

    return (
        <Sider
            collapsed={!state.isOpenRight}
            collapsedWidth={0}
            width={isMobile ? '100vh' : 350}
            className="drop-shadow-primary"
            style={{
                position: "sticky",
                top: 0,
                left: 0,
                bottom: 0,
                height: '100vh',
                minWidth: '100%'
            }}
            theme="light"
        >
            <Row className="px-4 py-3">
                <Col><CloseOutlined onClick={closeNavRight} className="cursor-pointer" /></Col>
            </Row>
        </Sider>
        // <></>
    )
}