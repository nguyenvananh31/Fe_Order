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
                <ConfigProvider locale={locale} theme={{ token: themeToken }}>
                    <Suspense fallback={<SpinnerLoader />}>
                        <Router />
                    </Suspense>
                </ConfigProvider>
            </Provider>
        </>
    );
}

export default App;
