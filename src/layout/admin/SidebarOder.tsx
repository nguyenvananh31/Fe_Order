import { Subscription } from "rxjs";
import { BaseEventPayload, EventBusName } from "../../utils/event-bus";
import EventBus from "../../utils/event-bus/event-bus";
import { useEffect, useRef, useState } from "react";
import Sider from "antd/es/layout/Sider";

interface ISate {
    loading: boolean;
    orderId?: number;
    loadingBtn: boolean;
    isOpen: boolean;
}

const innitState: ISate = {
    loading: false,
    loadingBtn: false,
    isOpen: false
}

export default function SidebarOder() {

    const [state, setState] = useState<ISate>(innitState);
    const subscriptions = useRef(new Subscription());

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
                    setState(prev => ({ ...prev, isOpen: data.payload.isOpen }))
                }
            })
        );
    };

    return (
        // <Sider
        //     collapsed={state.isOpen}
        //     collapsedWidth={0}
        //     width={300}
        // >
        //     Side
        // </Sider>
        <></>
    )
}