import React from "react";
import HeaderProfile from "./navProfile/headerProfile";
import AsideMain from "./navProfile/AsideMain";
import { Outlet } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      staleTime: 1000 * 60 * 5,
    },
  },
});
const Profiles: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="bg-gray-100 rounded-[30px] h-screen text-gray-800 text-sm leading-[21px] px-5 ">
      <div className="flex items-center mt-8 ">
        <h2 className="text-lg font-medium mr-auto mb-3 mt-3">
          Thông Tin Tài Khoản
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6 mx-3 h-3/4">
        <div className="col-span-1 md:col-span-3 bg-white h-full overflow-y-auto">
          <HeaderProfile />
          <AsideMain />
        </div>

        <div className="col-span-1 md:col-span-9 lg:col-span-9">
            <Outlet />
        </div>
      </div>
    </div>
          </QueryClientProvider>
  );
};

export default Profiles;
