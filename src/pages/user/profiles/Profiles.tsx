import React, { useState } from "react";
import HeaderProfile from "./navProfile/headerProfile";
import AsideMain from "./navProfile/AsideMain";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Drawer, Button } from "antd";

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
  const [drawerVisible, setDrawerVisible] = useState(false); // State to manage drawer visibility

  const showDrawer = () => {
    setDrawerVisible(true); // Open the drawer
  };

  const closeDrawer = () => {
    setDrawerVisible(false); // Close the drawer
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-gray-100 rounded-[30px] h-screen text-gray-800 text-sm leading-[21px] px-4 sm:px-5">
        <div className="flex items-center mt-8">
          <h2 className="text-lg font-medium mr-auto mb-3 mt-3">
            Thông Tin Tài Khoản
          </h2>
          <Button className="md:hidden" onClick={showDrawer}>
            Menu
          </Button>
        </div>

        {/* Drawer for mobile devices */}
        <Drawer
          title="Menu"
          placement="left"
          onClose={closeDrawer}
          open={drawerVisible}
          width="75%"
          styles={{body: { padding: 0, overflow: 'hidden', height: '100%' }}}
        >
          <div style={{ height: '100%', }}>
            <HeaderProfile />
            <AsideMain />
          </div>
        </Drawer>

        <div className="flex flex-col md:flex-row gap-6 mx-3 h-3/4">
          {/* Show HeaderProfile and AsideMain only on larger screens */}
          <div className="hidden md:flex md:flex-col md:w-1/3 bg-white h-full ">
            <HeaderProfile />
            <AsideMain />
          </div>

          <div className="flex-1 md:w-full md:h-3/4 ">
            <Outlet />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Profiles;
