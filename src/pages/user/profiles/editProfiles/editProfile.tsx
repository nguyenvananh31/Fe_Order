import { useQuery } from "@tanstack/react-query";
import { Button, Card, Form, Input } from "antd";
import { FormProps } from "antd/lib";
import { useState } from "react";
import useToast from "../../../../hooks/useToast";
import ApiUtils from "../../../../utils/api/api.utils";

type FieldType = {
  name: string;
  old_password: string;
  new_password: string;
  confirm_password: string;
};

const EditProfile = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  // const queryClient = useQueryClient()
  // const [form] = Form.useForm();

  const { data }: any = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await ApiUtils.fetch("/api/client/profile");
    },
  });


  // const { mutate } = useMutation({
  //   mutationFn: async (values: FieldType) => {
  //     try {
  //       const response = await ApiUtils.put(`/api/client/profile/${id}`, values);
  //       return response;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   onSuccess: () => {
  //       toast.showSuccess(`Successfully`)
  //       queryClient.invalidateQueries({
  //           queryKey: ["profile"]
  //       })
  //       form.resetFields();
  //   }, 
  //   onError: (error) => {
  //       toast.showError(`Error: ${error.message}`)
  //   }
  // });

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    // mutate(values);

    try {
      setLoading(true);
      await ApiUtils.put(`/api/client/profile/${data?.data?.id}`, values);
      toast.showSuccess('Cập nhật thông tin thành công!');
      setLoading(false);
    } catch (error: any) {
      toast.showError(error)
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Card title="Đổi thông tin tài khoản" style={{ maxWidth: 800, margin: "0 auto" }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>

          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: "Họ và tên là bắt buộc!" }]}
        >
          <Input className="mb-2" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mật khẩu cũ"
          name="old_password"
          rules={[{ required: true, message: "Mật khẩu cũ là bắt buộc!" },
          { min: 8, message: 'Mật khẩu tối thiểu phải có 8 ký tự!' }
          ]}
        >
          <Input.Password className="mb-2" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mật khẩu mới"
          name="new_password"
          rules={[{ required: true, message: "Mật khẩu mới là bắt buộc!" },
          { min: 8, message: 'Mật khẩu tối thiểu phải có 8 ký tự!' }]}
        >
          <Input.Password className="mb-2" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Xác nhận mật khẩu"
          name="confirm_password"
          dependencies={['new_password']}
          rules={[{ required: true, message: "Xác nhận mật khẩu là bắt buộc!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('new_password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
            },
          }),]}
        >
          <Input.Password className="mb-2" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditProfile;
