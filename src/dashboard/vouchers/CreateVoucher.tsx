import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Axios from "../../configs/Axios";
import { Button, Form, Input, InputNumber, message, Skeleton, Switch } from "antd";
import { BackwardFilled, Loading3QuartersOutlined } from "@ant-design/icons";
import { Ivouchers } from "../../interFaces/vouchers";


const CreateVouchers = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();
  
   
  
    const { mutate, isPending } = useMutation({
      mutationFn: async (vouchers: Ivouchers) => {
        try {
          return await Axios.post(`voucher`, vouchers);
        } catch (error) {
          throw new Error(`Error deleting`);
        }
      },
      onSuccess: () => {
        messageApi.open({
          content: "Thêm mới thành công",
          type: "success",
        });
  
        // Làm mới danh sách payments
        queryClient.invalidateQueries({
          queryKey: ["vouchers"],
        });
      },
      onError: () => {
        messageApi.error({
          content: "Thêm mới thất bại",
          type: "error",
        });
      },
    });
  
    const onFinish = (values: Ivouchers) => {
      mutate(values);
    };
  
    return (
      <div className="w-full max-w-md mx-auto p-6">
        {contextHolder}
        <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Thêm Mới Payments?
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Bạn Muốn Quay Lại Không?
              </p>
  
              <Link
                to="/admin/vouchers"
                className="text-blue-600 decoration-2 hover:underline font-medium cursor-pointer"
              >
                <BackwardFilled /> Quay lại
              </Link>
            </div>
  
            <div className="mt-5">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  disabled={isPending}
                >
                  <Form.Item
                  label="Tên Voucher"
                  name="name"
                  rules={[
                    { required: true, message: "Vui Lòng Nhập Tên" },
                    { type: "string", message: "Không được nhập ký tự đặc biệt" },
                  ]}
                >
                  <Input placeholder="Tên Voucher" />
                </Form.Item>
  
                <Form.Item
                  label="Trạng Thái"
                  name="status"
                  initialValue={false}
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  label="Custorm ID"
                  name="customer_id"
                  rules={[
                    { required: true, message: "Không được bỏ trống" },
                    { type: "number", message: "Không được nhập ký tự đặc biệt" },
                  ]}
                >
                  <InputNumber min={0}/>
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
            </div>
          </div>
        </div>
      </div>
    );
}

export default CreateVouchers
