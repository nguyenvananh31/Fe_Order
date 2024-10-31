import { Avatar, Space } from "antd";
import instance from "../../../../configs/Axios/AxiosConfig";
import { useQuery } from "@tanstack/react-query";

const HeaderProfile = () => {

  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      try {
        return await instance.get(`client/profile`);
      } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
    },
    refetchInterval: 60000, 
  });

  return (
    <div className="flex flex-col text-sm leading-[21px] px-3">
      <div className="flex items-center text-gray-800 p-5 border-b-2">
        <div className="hidden sm:flex sm:items-center mr-3">
          <Space direction="vertical" size={16}>
            <Avatar size={64} src="../../public/images/team/01.jpg" />
          </Space>
        </div>
        <div className="font-medium text-base capitalize">
        {data?.data.data.email || "email@exam.com"}
        </div>
      </div>
    </div>
  );
}

export default HeaderProfile;
