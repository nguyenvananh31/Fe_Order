import App from './App.tsx'
import './index.css'
import './configs/css/config.css'
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          refetchOnMount: false,
          refetchOnWindowFocus: false,
          retry: 3,
          staleTime: 0,
          refetchInterval: 1000 * 60,
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