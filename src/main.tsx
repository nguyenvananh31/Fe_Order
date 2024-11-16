import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx';
import './configs/css/config.css';
import './index.scss';
import store from "./utils/redux-store.utils.ts";


ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        {/* <PersistGate loading={<Loader />} persistor={persistor}> */}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        {/* </PersistGate> */}
    </Provider>


);