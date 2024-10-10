import React, { useState } from "react";
import {
  Button,
  Card,
  Modal,
  Form,
  Input,
  List,
  Descriptions,
  Checkbox,
  Popconfirm,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../../../../configs/Axios/AxiosConfig";

const FormInforProfile: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // Lấy thông tin profile (bao gồm địa chỉ)
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await instance.get("client/profile");
    },
  });

  // Mutation để thêm hoặc chỉnh sửa thông tin profile (bao gồm địa chỉ)
  const { mutate: createAddress } = useMutation({
    mutationFn: async (newAddress) => {
      return await instance.post("client/profile/store_address", newAddress); // Gọi API tạo mới
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setIsModalVisible(false);
      form.resetFields();
    },
  });

  const { mutate: updateAddress } = useMutation({
    mutationFn: async (updatedAddress) => {
      return await instance.put(
        `client/profile/update_address/${editingAddress.id}`,
        updatedAddress
      ); // Gọi API cập nhật
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setIsModalVisible(false);
      form.resetFields();
    },
  });

  // const { mutate: isDelete } = useMutation({
  //   mutationFn: async (updatedAddress) => {
  //     return await instance.put(`client/profile/update_address/${editingAddress.id}`, updatedAddress); // Gọi API cập nhật
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["profile"] });
  //     setIsModalVisible(false);
  //     form.resetFields();
  //   },
  // });

  // Hiển thị modal thêm hoặc chỉnh sửa địa chỉ
  const showModal = (address = null) => {
    if (address) {
      setIsEditMode(true);
      setEditingAddress(address); // Gán địa chỉ đang chỉnh sửa
      form.setFieldsValue(address); // Đặt giá trị form thành địa chỉ cần chỉnh sửa
    } else {
      setIsEditMode(false);
      form.resetFields(); // Reset form khi thêm mới
    }
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Xử lý submit form
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (isEditMode) {
          updateAddress({ ...values, is_default: values.is_default ? 1 : 0 }); // Gọi API cập nhật
        } else {
          createAddress({ ...values, is_default: values.is_default ? 1 : 0 }); // Gọi API tạo mới
        }
      })
      .catch((info) => {
        console.error("Validate Failed:", info);
      });
  };

  return (
    <div>
      <Card size="small" title="Thông Tin Khách Hàng" className="mb-4">
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Tên">
            {data?.data.data.customer?.name || "Chưa có tên"}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {data?.data.data.customer?.email || "Chưa có email"}
          </Descriptions.Item>
          <Descriptions.Item label="Số Điện Thoại">
            {data?.data.data?.customer?.phone_number || "Chưa có số điện thoại"}
          </Descriptions.Item>
          <Descriptions.Item label="Điểm Thưởng">
            {data?.data.data?.customer?.diemthuong || 0}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card
        title="Địa chỉ của tôi"
        extra={<Button onClick={() => showModal()}>Thêm địa chỉ</Button>}
      >
        <List
          itemLayout="horizontal"
          dataSource={data?.data.data?.addresses || []}
          renderItem={(address) => (
            <List.Item
              actions={[
                <a key="edit" onClick={() => showModal(address)}>
                  Chỉnh sửa
                </a>,
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa địa chỉ này?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => {
                    console.log("Xóa địa chỉ: ", address);
                    // Xử lý xóa ở đây nếu cần
                  }}
                >
                  <a key="delete" className="text-red-500">
                    Xóa Địa Chỉ
                  </a>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                title={`${address.city}, ${address.state}`}
                description={`${address.address}, ${address.postal_code}, ${address.country}`}
              />
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title={isEditMode ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true }]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
          <Form.Item name="city" label="Thành phố" rules={[{ required: true }]}>
            <Input placeholder="Nhập thành phố" />
          </Form.Item>
          <Form.Item
            name="state"
            label="Tỉnh/Thành phố"
            rules={[{ required: true }]}
          >
            <Input placeholder="Nhập tỉnh/thành phố" />
          </Form.Item>
          <Form.Item
            name="postal_code"
            label="Mã bưu điện"
            rules={[{ required: true }]}
          >
            <Input placeholder="Nhập mã bưu điện" />
          </Form.Item>
          <Form.Item
            name="country"
            label="Quốc gia"
            rules={[{ required: true }]}
          >
            <Input placeholder="Nhập quốc gia" />
          </Form.Item>
          <Form.Item name="is_default" valuePropName="checked">
            <Checkbox>Đặt làm mặc định</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FormInforProfile;
