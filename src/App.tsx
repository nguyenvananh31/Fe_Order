import { ConfigProvider } from "antd";
import locale from 'antd/locale/vi_VN';
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Subscription } from "rxjs";
import SpinnerLoader from './components/loader';
import { themeToken } from "./constants/common";
import { RoutePath } from "./constants/path";
import useAuth from "./hooks/redux/auth/useAuth";
import useToast from "./hooks/useToast";
import { ToastProvider } from "./hooks/useToast/handling";
import PusherProvider from "./hooks/usePusher";
import Router from "./routes";
import { BaseEventPayload, EventBusName } from "./utils/event-bus";
import EventBus from "./utils/event-bus/event-bus";

function Root({ children }: any) {
    const [mounted, setMounted] = useState<boolean>(false);
    const subscriptions = useRef<any>();
    const toast = useToast();
    const navigation = useNavigate();
    const { clearStore } = useAuth();

    useEffect(() => {
        setMounted(true);
        registerEventBus();

        return () => {
            subscriptions.current?.unsubscribe();
        }
    }, []);

    const registerEventBus = useCallback(() => {
        subscriptions.current = new Subscription();
        subscriptions.current.add(
            EventBus.getInstance().events.subscribe((data: BaseEventPayload<any>) => {
                switch (data.type) {
                    case EventBusName.LOGOUT:
                        handleAlertLogout();
                        break;
                    case EventBusName.INVALID_TOKEN:
                        handleLogout();
                        break;
                    case EventBusName.LOGOUT_HANDLE:
                        handleGetLogout();
                        break;
                }
            })
        )
    }, []);

    const handleGetLogout = useCallback(() => {
        clearStore();
    }, []);

    const handleAlertLogout = () => {
        toast.showSuccess('Đăng xuất tài khoản thành công!');
        navigation('/' + RoutePath.LOGIN);
    };

    const handleLogout = () => {
        toast.showError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!');
        navigation('/' + RoutePath.LOGIN);
    };

    return <>
        {mounted && children}
    </>
}

function App() {

    return (
        <>
            <ToastProvider>
                <ConfigProvider locale={locale} theme={{ token: themeToken }}>
                    <PusherProvider>
                        <Root>
                            <Suspense fallback={<SpinnerLoader />}>
                                <Router />
                            </Suspense>
                        </Root>
                    </PusherProvider>
                </ConfigProvider>
            </ToastProvider>
        </>
    );
}

export default App;