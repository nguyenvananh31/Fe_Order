import { UserSwitchOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Select, Space } from "antd";

const UserProfile = () => {
  const { Option } = Select;
  const { TextArea } = Input;

  return (
    <div className="bg-gray-100 rounded-[30px] text-gray-800 text-sm leading-[21px] px-5 pb-10">
      <div className="flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto mb-3 mt-3">Thông Tin Tài Khoản</h2>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse bg-white rounded-lg">
          <div className="flex flex-col-reverse text-sm leading-[21px] col-span-4">
            <div className="flex items-center text-gray-800 p-5 border-b-2">
              <Space direction="vertical" size={16}>
                <Avatar size={64} src="../../public/images/team/01.jpg" />
              </Space>
              <div className="font-medium text-base px-3">
                Kate Winslet
                <div className="text-gray-600">Software Engineer</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-5 border-t border-gray-200">
            <div className="flex items-center text-[#0077ad] font-sans text-sm font-medium leading-[21px] cursor-pointer hover:translate-x-1 transition">
              <div className="mr-2">
                <UserSwitchOutlined />
              </div>
              Thông tin tài khoản
            </div>
          </div>

          {/* Buttons */}
          <div className="p-5 border-t border-gray-200">
            <div className="flex justify-between">
              <Button type="primary">New Sort</Button>
              <Button>New Sort</Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
          <div className="flex items-center text-gray-800 text-sm leading-[21px] p-5 bg-white rounded-lg">
            <div className="text-gray-800 font-sans font-medium leading-6">
              Nội dung của bạn
            </div>
          </div>

          {/* Container for Image and Form */}
          <div className="flex flex-wrap lg:flex-nowrap items-start gap-4">
            {/* Image Section */}
            <div className="w-full lg:w-1/4">
              <div className="border-t rounded-[6px] text-gray-800 text-sm leading-[21px] p-5 bg-white">
                <img
                  src="../../public/images/team/01.jpg"
                  alt=""
                  className="rounded-[6px] mt-3 max-w-full "
                />
                <Button type="primary" className="mt-9 w-full">
                  Update Image
                </Button>
              </div>
            </div>

            {/* Form Section */}
            <div className="w-full lg:w-3/4">
              <div className="border-t rounded-[6px] text-gray-800 text-sm leading-[21px] p-5 bg-white">
                <Form>
                  <Form.Item>
                    <label className="m-1">Tên Của Bạn</label>
                    <Input placeholder="Kate Winslet" className="mt-1 outline-none" />
                  </Form.Item>

                  <Form.Item>
                    <label className="m-1">Giới tính</label>
                    <Select className="w-full" placeholder="Giới tính" style={{ borderRadius: "6px" }}>
                      <Option value="nu">Nữ</Option>
                      <Option value="nam">Nam</Option>
                      <Option value="khac">Tùy Chọn</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <label className="m-1">Địa Chỉ Hiện Tại</label>
                    <Select className="w-full" placeholder="-- Chọn --" style={{ borderRadius: "6px" }}>
                      <Option value="hanoi1">Hà Nội 1</Option>
                      <Option value="hanoi2">Hà Nội 2</Option>
                      <Option value="hanoi3">Hà Nội 3</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <label className="m-1">Địa chỉ Chi Tiết</label>
                    <TextArea placeholder="Nhập văn bản ở đây..." style={{ borderRadius: "6px" }} />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary">Save</Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-[30px] text-gray-800 text-sm leading-[21px] px-5 pb-10">
      <div>
        <h2 className="text-lg font-medium mr-auto mb-3 mt-8">Thông Tin Cá Nhân</h2>
      </div>

      {/* Two Form Sections in One Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* First Form */}
        <div className="border-t rounded-[6px] text-gray-800 text-sm leading-[21px] p-5 bg-white">
          <Form>
            <Form.Item>
              <label className="m-1">Tài Khoản Email</label>
              <Input placeholder="Nhập tài khoản email" className="mt-1 outline-none" />
            </Form.Item>

            <Form.Item>
              <label className="m-1">Mật Khẩu</label>
              <Input.Password placeholder="Nhập mật khẩu" className="mt-1 outline-none" />
            </Form.Item>

            <Form.Item>
              <label className="m-1">ID</label>
              <Input placeholder="Nhập ID" className="mt-1 outline-none" />
            </Form.Item>

            <Form.Item>
              <label className="m-1">Loại ID</label>
              <Select className="w-full" placeholder="-- Chọn loại ID --" style={{ borderRadius: "6px" }}>
                <Option value="cmnd">CMND</Option>
                <Option value="cccd">CCCD</Option>
                <Option value="passport">Passport</Option>
              </Select>
            </Form.Item>
          </Form>
        </div>

        {/* Second Form */}
        <div className="border-t rounded-[6px] text-gray-800 text-sm leading-[21px] p-5 bg-white">
          <Form>
            <Form.Item>
              <label className="m-1">Số ID</label>
              <Input placeholder="Nhập số ID" className="mt-1 outline-none" />
            </Form.Item>

            <Form.Item>
              <label className="m-1">Số Điện Thoại</label>
              <Input placeholder="Nhập số điện thoại" className="mt-1 outline-none" />
            </Form.Item>

            <Form.Item>
              <label className="m-1">Địa Chỉ</label>
              <Input placeholder="Nhập địa chỉ" className="mt-1 outline-none" />
            </Form.Item>

            <Form.Item>
              <label className="m-1">Tên Ngân Hàng</label>
              <Input placeholder="Nhập tên ngân hàng" className="mt-1 outline-none" />
            </Form.Item>

            <Form.Item>
              <label className="m-1">Số Tài Khoản Ngân Hàng</label>
              <Input placeholder="Nhập số tài khoản ngân hàng" className="mt-1 outline-none" />
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-4">
        <Button type="primary">Lưu Thông Tin</Button>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
