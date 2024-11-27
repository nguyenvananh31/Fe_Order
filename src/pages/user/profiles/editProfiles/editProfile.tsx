import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Form, Input } from "antd";
import { FormProps } from "antd/lib";
import useToast from "../../../../hooks/useToast";
import ApiUtils from "../../../../utils/api/api.utils";

type FieldType = {
  name: string;
  old_password: string;
  new_password: string;
  confirm_password: string;
};

const EditProfile = () => {
  const toast = useToast();
  const queryClient = useQueryClient()
  const [form] = Form.useForm();

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await ApiUtils.fetch("/api/client/profile");
    },
  });

  const id = data?.data.data.id;

  const { mutate } = useMutation({
    mutationFn: async (values: FieldType) => {
      try {
        const response = await ApiUtils.put(`/api/client/profile/${id}`, values);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
        toast.showSuccess(`Successfully`)
        queryClient.invalidateQueries({
            queryKey: ["profile"]
        })
        form.resetFields();
    }, 
    onError: (error) => {
        toast.showError(`Error: ${error.message}`)
    }
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    mutate(values);
  };

  return (
    <Card title="Edit Profile" style={{ maxWidth: 800, margin: "0 auto" }}>
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
        
          label="Username"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input className="mb-2"/>
        </Form.Item>

        <Form.Item<FieldType>
          label="Old Password"
          name="old_password"
          rules={[{ required: true, message: "Please input your old password!" }]}
        >
          <Input.Password className="mb-2"/>
        </Form.Item>

        <Form.Item<FieldType>
          label="New Password"
          name="new_password"
          rules={[{ required: true, message: "Please input your new password!" }]}
        >
          <Input.Password className="mb-2"/>
        </Form.Item>

        <Form.Item<FieldType>
          label="Confirm Password"
          name="confirm_password"
          rules={[{ required: true, message: "Please confirm your new password!" }]}
        >
          <Input.Password className="mb-2"/>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditProfile;
