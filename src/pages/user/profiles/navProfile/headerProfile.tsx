
import { Avatar, Space } from "antd";

const HeaderProfile = ({profile}) => {
  return (
    <div className="flex flex-col-reverse text-sm leading-[21px] col-span-4  px-3">
    <div className="flex items-center text-gray-800 p-5 border-b-2">
      <Space direction="vertical" size={16}>
        <Avatar size={64} src="../../public/images/team/01.jpg"/>
      </Space>
      <div className="font-medium text-base px-3 capitalize">
        {profile?.customer?.name || "Name"}
        <div className="text-gray-600">
          {profile?.customer?.email || "Email"} <br />
        </div>
      </div>
    </div>
  </div>
  )
}

export default HeaderProfile