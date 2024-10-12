import { ConfigProvider } from "antd";
import locale from 'antd/locale/vi_VN';
import { Suspense } from "react";
import { Provider } from 'react-redux';
import SpinnerLoader from './components/loader';
import { themeToken } from "./constants/common";
import Router from "./routes";
import reduxStoreUtils from './utils/redux-store.utils';
import { ProductProvider } from './context/ProductContext';  // Import ProductProvider
import { ToastProvider } from "./hooks/useToast/handling";

function App() {
    return (
        <>
            {/* Bao bọc ứng dụng với ProductProvider */}
             <ProductProvider> 
                <Provider store={reduxStoreUtils}>
                    <ToastProvider>
                        <ConfigProvider locale={locale} theme={{ token: themeToken }}>
                            <Suspense fallback={<SpinnerLoader />}>
                                <Router />
                            </Suspense>
                        </ConfigProvider>
                    </ToastProvider>
                </Provider>
             </ProductProvider> 
        </>
    );
}

export default App;