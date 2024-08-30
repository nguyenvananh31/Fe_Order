import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Axios from "../../configs/Axios";
import { Button, Form, Input, InputNumber, message, Skeleton, Switch } from "antd";
import { BackwardFilled, Loading3QuartersOutlined } from "@ant-design/icons";
import { IPayments } from "../../interFaces/payments";


const UpdatePayments = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();
    const { id } = useParams();
  
    const { data, isLoading } = useQuery({
      queryKey: ["payments", id],
      queryFn: () => Axios.get(`/payments/${id}`),
    });
  
    const { mutate, isPending } = useMutation({
      mutationFn: async (payments: IPayments) => {
        try {
          return await Axios.put(`payments/${id}`, payments);
        } catch (error) {
          throw new Error(`Error deleting`);
        }
      },
      onSuccess: () => {
        messageApi.open({
          content: "Cập nhật thành công",
          type: "success",
        });
  
        // Làm mới danh sách payments
        queryClient.invalidateQueries({
          queryKey: ["payments"],
        });
      },
      onError: () => {
        messageApi.error({
          content: "Cập nhật thất bại",
          type: "error",
        });
      },
    });
  
    const onFinish = (values: IPayments) => {
      mutate(values);
    };
  
    return (
      <div className="w-full max-w-md mx-auto p-6">
        {contextHolder}
        <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Cập Nhật Payments?
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Bạn Muốn Quay Lại Không?
              </p>
  
              <Link
                to="/admin"
                className="text-blue-600 decoration-2 hover:underline font-medium cursor-pointer"
              >
                <BackwardFilled /> Quay lại
              </Link>
            </div>
  
            <div className="mt-5">
              <Skeleton loading={isLoading} active>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  initialValues={data?.data}
                  disabled={isPending}
                >
                  <Form.Item
                  label="Tên payments"
                  name="name"
                  rules={[
                    { required: true, message: "Vui Lòng Nhập Tên" },
                    { type: "string", message: "Không được nhập ký tự đặc biệt" },
                  ]}
                >
                  <Input placeholder="Tên payments" />
                </Form.Item>
  
                <Form.Item
                  label="Trạng Thái"
                  name="status"

                >
                  <Switch />
                </Form.Item>

         
  
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      {isPending ? (
                        <>
                          <Loading3QuartersOutlined className="animate-spin" />{" "}
                          Submit
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </Form.Item>
                </Form>
              </Skeleton>
            </div>
          </div>
        </div>
      </div>
    );
}

export default UpdatePayments
