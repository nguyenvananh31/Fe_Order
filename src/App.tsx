import { ConfigProvider } from "antd";
import locale from 'antd/locale/vi_VN';
import { Suspense } from "react";
import { Provider } from 'react-redux';
import SpinnerLoader from './components/loader';
import { themeToken } from "./constants/common";
import Router from "./routes";
import reduxStoreUtils from './utils/redux-store.utils';

function App() {

    // const customizeRenderEmpty = () => <Typography.Text>Dữ liệu không tồn tại!</Typography.Text>;

    return (
        <>
            <Provider store={reduxStoreUtils}>
                <Suspense fallback={<SpinnerLoader />}>
                    <ConfigProvider locale={locale} theme={{ token: themeToken }}>
                        <Router />
                    </ConfigProvider>
                </Suspense>
            </Provider>
        </>
    );
}

export default App;
