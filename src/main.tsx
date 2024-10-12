import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx';
import './configs/css/config.css';
import './index.scss';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
const queyClinet= new QueryClient({
    
})

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queyClinet}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </QueryClientProvider>
);