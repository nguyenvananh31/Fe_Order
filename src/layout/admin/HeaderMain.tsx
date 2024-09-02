import { AppstoreOutlined, BellOutlined, CloseOutlined, LogoutOutlined, MailOutlined, MenuUnfoldOutlined, SearchOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Drawer, Dropdown, Menu, MenuProps } from "antd";
import useHeader from "./header.hooks";

// Menu item Account
const items: MenuProps['items'] = [
  {
    key: '1',
    style: {
      padding: 0,
      margin: "4px"
    },
    label: (
      <div className="flex items-center px-4 py-2 gap-4 min-w-[180px] rounded-primary group hover:bg-purple">
        <Avatar className="w-[38px] h-[38px]" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        <div className="flex flex-col">
          <span className="text-primary font-semibold text-base group-hover:text-purple">Le Do</span>
          <span className="text-ghost text-sm font-normal">Admin</span>
        </div>
      </div>
    ),
  },
  {
    key: '2',
    style: {
      padding: 0,
      margin: "4px"
    },
    label: (
      <div className="flex items-center px-4 py-2 gap-2 min-w-[180px] rounded-primary group hover:bg-purple">
        <UserOutlined className="text-primary text-base group-hover:text-purple" />
        <span className="text-primary text-base group-hover:text-purple">Quản lý tài khoản</span>
      </div>
    ),
  },
  {
    key: '3',
    style: {
      padding: 0,
      margin: "4px"
    },
    label: (
      <div className="flex items-center px-4 py-2 gap-2 min-w-[180px] rounded-primary group hover:bg-purple">
        <LogoutOutlined className="text-primary text-base group-hover:text-purple" />
        <span className="text-primary text-base group-hover:text-purple">Đăng xuất</span>
      </div>
    ),
  },
];

type MenuItem = Required<MenuProps>['items'][number];

const itemsSidebar: MenuItem[] = [
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      {
        key: 'g1',
        label: 'Item 1',
        type: 'group',
        children: [
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' },
        ],
      },
      {
        key: 'g2',
        label: 'Item 2',
        type: 'group',
        children: [
          { key: '3', label: 'Option 3' },
          { key: '4', label: 'Option 4' },
        ],
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
  },
  {
    key: 'grp',
    label: 'Group',
    type: 'group',
    children: [
      { key: '13', label: 'Option 13' },
      { key: '14', label: 'Option 14' },
    ],
  },
];

// Menu item sidebar

export const HeaderMain = () => {

  const { ...hooks } = useHeader();

  return (
    <>
      <div className="bg-white drop-shadow-primary rounded-primary mt-4 mx-6 px-5 leading-none py-3">
        <div className="flex max-xl:gap-4 items-center justify-between">
          <div className="">
            <MenuUnfoldOutlined onClick={hooks.toggleDraw} className="text-xl text-ghost cursor-pointer xl:hidden" />
          </div>
          <div className=" flex-1 flex items-center justify-between">
            {/* Search */}
            <div className="flex items-center gap-2 cursor-pointer h-max">
              <SearchOutlined className="text-2xl text-ghost" />
              <span className="text-ghost text-[15px] max-md:hidden">Search {'(Ctrl+/)'}</span>
            </div>
            {/* Search End */}
            <div className="flex gap-5 items-center justify-between h-max">
              {/* Notification */}
              <div>
                <Badge count='9'>
                  <BellOutlined className="text-ghost text-xl cursor-pointer" />
                </Badge>
              </div>
              {/* Notification End*/}
              {/* Account */}
              <div>
                <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
                  <Avatar className="cursor-pointer w-[38px] h-[38px]" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </Dropdown>
              </div>
              {/* Account End */}
            </div>
          </div>
        </div>
      </div>
      <Drawer
        closeIcon={false}
        placement="left"
        onClose={hooks.toggleDraw}
        open={hooks.open}
        bodyStyle={{
          padding: 0,
        }}
        width={230}
      >
        <div className={`m-1 justify-around py-3 flex items-center`}>
          <div className="flex justify-around items-center gap-3">
            <div className="flex gap-2 items-center">
              <Avatar src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' />
              <h1 className="text-xl font-bold">Logo Branch</h1>
            </div>
            <CloseOutlined className="text-ghost text-base cursor-pointer" onClick={hooks.toggleDraw}/>
          </div>
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          // defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          items={itemsSidebar}
        />
      </Drawer>
    </>
  )
}
