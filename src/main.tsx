import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux';
import reduxStoreUtils from './utils/redux-store.utils'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={reduxStoreUtils}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </QueryClientProvider>
);