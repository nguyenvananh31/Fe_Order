import React, { useEffect } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import instanceAxios from "../../../../configs/Axios/AxiosConfig";
import { Isize } from "../../../../interFaces/size";

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
  


  // Mutation cho POST (Thêm mới)
  const { mutate: addSize, isPending: isAdding } = useMutation({
    mutationFn: async (newSize: Isize) => {
      return await instanceAxios.post("/admin/sizes", newSize);
    },
    onSuccess: () => {
      messageApi.success("Thêm  thành công.");
      form.resetFields()

      queryClient.invalidateQueries({ queryKey: ["sizes"] });
      onClose();
    },
    onError: () => {
      messageApi.error("Thêm  không thành công.");
    },
  });

  // Mutation
  // Mutation cho PUT (Chỉnh sửa)
  const { mutate: editSize, isPending: isEditing } = useMutation({
    mutationFn: async (updatedSizes: Isize) => {
      return await instanceAxios.put(`/admin/sizes/${updatedSizes.id}`, updatedSizes);
    },
    onSuccess: () => {
      messageApi.success("Chỉnh sửa thành công.");
      queryClient.invalidateQueries({ queryKey: ["sizes"] });
      form.resetFields()
      onClose();
    },
    onError: () => {
      messageApi.error("Chỉnh sửa  không thành công.");
    },
  });

  // Khi modal mở ra để chỉnh sửa, điền dữ liệu khách hàng vào form
  useEffect(() => {
    if (size) {
      form.setFieldsValue(size);
    } else {
      form.resetFields();
    }
  }, [size, form]);

  // Xử lý khi submit form
  const handleSubmit = (values: Isize) => {
    if (size) {
      // Chỉnh sửa
      editSize({ ...size, ...values });
    } else {
      // Thêm mới
      addSize(values);
      console.log("values" , values);
      
    }
  };

  return (
    <Modal
      title={size ? "Chỉnh sửa khách hàng" : "Thêm mới khách hàng"}
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
          label="Tên "
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
        label="Trạng Thái "
          name="status"
        >

        <Select
              style={{ width: "100%" }}
              placeholder="Please select"
              options={[
                {
                  value: 0,
                  label: 'Không hoạt Động',
                },
                {
                    value: 1,
                    label: 'Hoạt Động',
                },
              ]}
            />
        
        </Form.Item>
        <Form.Item className="mt-2">
          <Button type="primary" htmlType="submit" loading={isAdding || isEditing}>
            {size ? "Lưu chỉnh sửa" : "Thêm mới"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalComponent;