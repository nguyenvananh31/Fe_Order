import React, { useEffect } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Isize } from "../../../../interFaces/size";
import instanceAxios from "../../../../configs/Axios/AxiosConfig";

interface ModalComponentProps {
  visible: boolean;
  onClose: () => void;
  size?: Isize | null; // Nếu có giá trị thì là chỉnh sửa, không có thì là thêm mới
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  visible,
  onClose,
  size,
}) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const { Option } = Select; 

  // Mutation cho POST (Thêm mới)
  const { mutate: addSize, isPending: isAdding } = useMutation({
    mutationFn: async (newSize: Isize) => {
      return await instanceAxios.post("/admin/sizes", newSize);
    },
    onSuccess: () => {
      messageApi.success("Thêm thành công.");
      queryClient.invalidateQueries({ queryKey: ["size"] });
      form.resetFields();
      onClose();
    },
    onError: (error: any) => {
      console.error("Lỗi khi thêm size:", error.response?.data);  // In lỗi chi tiết từ server
      messageApi.error("Thêm không thành công.");
    },
  });

  // Mutation cho PUT (Chỉnh sửa)
  const { mutate: editSize, isPending: isEditing } = useMutation({
    mutationFn: async (updatedSize: Isize) => {
      return await instanceAxios.put(`/admin/sizes/${updatedSize.id}`, updatedSize);
    },
    onSuccess: () => {
      messageApi.success("Chỉnh sửa thành công.");
      queryClient.invalidateQueries({ queryKey: ["size"] });
      form.resetFields();
      onClose();
    },
    onError: (error: any) => {
      console.error("Lỗi khi chỉnh sửa size:", error.response?.data);  // In lỗi chi tiết từ server
      messageApi.error("Chỉnh sửa không thành công.");
    },
  });

  // Khi modal mở ra để chỉnh sửa, điền dữ liệu size vào form
  useEffect(() => {
    if (size) {
      form.setFieldsValue(size);
    } else {
      form.resetFields();
    }
  }, [size, form]);

  // Xử lý khi submit form
  const handleSubmit = (values: Isize) => {
    // Nếu không có giá trị `status` trong `values`, đặt mặc định là 0
    const payload = {
      ...values,
      status: values.status !== undefined ? values.status : 0,
    };

    console.log("Submitting values:", payload); // Kiểm tra payload gửi lên

    if (size) {
      // Chỉnh sửa
      editSize({ ...size, ...payload });
    } else {
      // Thêm mới
      addSize(payload);
    }
  };

  return (
    <Modal
      title={size ? "Chỉnh sửa kích thước" : "Thêm mới kích thước"}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={size || {}}
      >
        <Form.Item
          label="Tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input />
        </Form.Item>

        {/* Thêm trường status */}
        <Form.Item
          label="Trạng thái"
          name="status"
          initialValue={0}  // Giá trị mặc định là 0
        >
          <Select>
            <Option value={0}>Không hoạt động</Option>
            <Option value={1}>Hoạt động</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isAdding || isEditing}>
            {size ? "Lưu chỉnh sửa" : "Thêm mới"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalComponent;
