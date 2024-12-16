import { Avatar, Space } from "antd";
import useAuth from "../../../../hooks/redux/auth/useAuth";

const HeaderProfile = () => {

  const { user } = useAuth();

  return (
    <div className="flex flex-col text-sm leading-[21px] px-3">
      <div className="flex items-center text-gray-800 p-5 border-b-2">
        <div className="hidden sm:flex sm:items-center mr-3">
          <Space direction="vertical" size={16}>
            <Avatar size={64} src="/images/team/01.jpg" />
          </Space>
        </div>
        <div className="font-medium text-base capitalize">
          {user?.email || "email@exam.com"}
        </div>
      </div>
    </div>
  );
}

export default HeaderProfile;
