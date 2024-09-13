import React, { useEffect } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Icustomer } from "../../../../interFaces/custommers";
import instanceAxios from "../../../../configs/Axios/AxiosConfig";

interface ModalComponentProps {
  visible: boolean;
  onClose: () => void;
  customer?: Icustomer | null; // Nếu có giá trị thì là chỉnh sửa, không có thì là thêm mới
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  visible,
  onClose,
  customer,
}) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();


  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => instanceAxios.get(`admin/users`),
  });

  console.log(user?.data.data);
  


  // Mutation cho POST (Thêm mới)
  const { mutate: addCustomer, isPending: isAdding } = useMutation({
    mutationFn: async (newCustomer: Icustomer) => {
      return await instanceAxios.post("/admin/customers", newCustomer);
    },
    onSuccess: () => {
      messageApi.success("Thêm khách hàng thành công.");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      onClose();
    },
    onError: () => {
      messageApi.error("Thêm khách hàng không thành công.");
    },
  });

  // Mutation
  // Mutation cho PUT (Chỉnh sửa)
  const { mutate: editCustomer, isPending: isEditing } = useMutation({
    mutationFn: async (updatedCustomer: Icustomer) => {
      return await instanceAxios.put(`/admin/customers/${updatedCustomer.id}`, updatedCustomer);
    },
    onSuccess: () => {
      messageApi.success("Chỉnh sửa khách hàng thành công.");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      onClose();
    },
    onError: () => {
      messageApi.error("Chỉnh sửa khách hàng không thành công.");
    },
  });

  // Khi modal mở ra để chỉnh sửa, điền dữ liệu khách hàng vào form
  useEffect(() => {
    if (customer) {
      form.setFieldsValue(customer);
    } else {
      form.resetFields();
    }
  }, [customer, form]);

  // Xử lý khi submit form
  const handleSubmit = (values: Icustomer) => {
    if (customer) {
      // Chỉnh sửa
      editCustomer({ ...customer, ...values });
    } else {
      // Thêm mới
      addCustomer(values);
    }
  };

  return (
    <Modal
      title={customer ? "Chỉnh sửa khách hàng" : "Thêm mới khách hàng"}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={customer || {}}
      >
        <Form.Item
          label="Tên khách hàng"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên khách hàng!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone_number"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Điểm thưởng"
          name="diemthuong"
          rules={[{ required: true, message: "Vui lòng nhập điểm thưởng!" }]}
          initialValue={0}
        >
          <Input disabled={true}/>
        </Form.Item>
        {/* Thêm các trường cần thiết khác */}

        <Form.Item
          label="Tài Khoản Nhận Thưởng"
          name="user_id"
          rules={[{ required: true, message: "Vui lòng nhập điểm thưởng!" }]}
        >
          <Select
              style={{ width: "100%" }}
              placeholder="Please select"
              options={user?.data.data.map(
                (user: { id: number ; name: string }) => ({
                  value: user.id,
                  label: user.name,
                })
              )}
            />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isAdding || isEditing}>
            {customer ? "Lưu chỉnh sửa" : "Thêm mới"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalComponent;
