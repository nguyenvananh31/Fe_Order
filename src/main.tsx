import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx';
import './configs/css/config.css';
import './index.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,  
        retry: 3, 
        staleTime: 1000 * 60 * 5,
      },
    },
  });

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </QueryClientProvider>

);