import { ConfigProvider } from "antd";
import locale from 'antd/locale/vi_VN';
import { Suspense } from "react";
import { Provider } from 'react-redux';
import SpinnerLoader from './components/loader';
import { themeToken } from "./constants/common";
import Router from "./routes";
import reduxStoreUtils from './utils/redux-store.utils';
import { ProductProvider } from './context/ProductContext';  // Import ProductProvider

function App() {
    return (
        <>
            {/* Bao bọc ứng dụng với ProductProvider */}
            <ProductProvider>
                <Provider store={reduxStoreUtils}>
                    <ConfigProvider locale={locale} theme={{ token: themeToken }}>
                        <Suspense fallback={<SpinnerLoader />}>
                            <Router />
                        </Suspense>
                    </ConfigProvider>
                </Provider>
            </ProductProvider>
        </>
    );
}

export default App;