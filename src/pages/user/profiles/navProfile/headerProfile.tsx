
import { Avatar, Space } from "antd";
import instance from "../../../../configs/Axios/AxiosConfig";
import { useQuery } from "@tanstack/react-query";

const HeaderProfile = () => {

  const {data } = useQuery({
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
  })


  console.log(data?.data.data);
  

  return (
    <div className="flex flex-col-reverse text-sm leading-[21px] col-span-4  px-3">
    <div className="flex items-center text-gray-800 p-5 border-b-2">
      <Space direction="vertical" size={16}>
        <Avatar size={64} src="../../public/images/team/01.jpg"/>
      </Space>
      <div className="font-medium text-base px-3 capitalize">
      {data?.data.data.name}
        <div className="text-gray-600">
        {data?.data.data.email}
        </div>
      </div>
    </div>
  </div>
  )
}

export default HeaderProfile