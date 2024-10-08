import React, { useEffect, useState } from "react";
import instance from "../../../configs/Axios/AxiosConfig";
import { Button, Form } from "antd";
import HeaderProfile from "./navProfile/headerProfile";
import AsideMain from "./navProfile/AsideMain";
import { Outlet } from "react-router-dom";

const Profiles: React.FC = () => {
  const [form] = Form.useForm();
  const [profile, setProfile] = useState<any>(null);
  const [isEditingAddresses, setIsEditingAddresses] = useState(false);
  const url = "client/profile";

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(url);
        setProfile(res.data.data || {});
        form.setFieldsValue({ addresses: res.data.data?.addresses || [] });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      }
    })();
  }, [form]);

  return (
    //thay bg cua layout vao
    <div className="bg-gray-100 rounded-[30px] h-screen text-gray-800 text-sm leading-[21px] px-5 ">
      <div className="flex items-center mt-8 ">
        <h2 className="text-lg font-medium mr-auto mb-3 mt-3">Thông Tin Tài Khoản</h2>
        <Button type="primary" onClick={() => setIsEditingAddresses(!isEditingAddresses)}>
          {isEditingAddresses ? "Hủy" : "Chỉnh Sửa Địa Chỉ"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6 mx-3 h-3/4">
        <div className="col-span-1 md:col-span-3 bg-white">
          <HeaderProfile profile={profile} />
          <AsideMain />
        </div>
        <Outlet />
        
      </div>
    </div>
  );
};

export default Profiles;
