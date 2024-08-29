import { Form, Input, Button, Checkbox, notification } from "antd";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // Lấy dữ liệu từ local nếu người dùng đã từng lưu thông tin đăng nhập
    useEffect(() => {
        const storedEmail = localStorage.getItem("rememberedEmail");
        // Nếu tồn tại thì set lại dữ liệu cho form
        if (storedEmail) {
            form.setFieldsValue({ email: storedEmail, remember: true });
        }
    }, [form]);

    // Xử lý dữ liệu khi ấn đăng nhập
    const onFinish = async (values: {
        email: string;
        password: string;
        remember: boolean;
    }) => {
        try {
            // Lấy dữ liệu mẫu từ database
            const { data } = await axios.get("/api/users");
            const dataUser = data;

            // Kiểm tra dữ liệu được người dùng nhập vào với dữ liệu ở trong database
            const user = dataUser.find(
                (user: { email: string; password: string }) =>
                    user.email === values.email && user.password === values.password
            );

            // Nếu tồn tại
            if (user) {
                // Kiểm tra người dùng có ghi nhớ tài khoản không
                if (values.remember) {
                    localStorage.setItem("rememberedEmail", values.email);

                    // Chuyển đến trang dashboard
                    navigate("admin/dashboard");
                } else {
                    localStorage.removeItem("rememberedEmail");
                }

                // Thông báo cho người dùng
                notification.success({
                    message: "Đăng nhập thành công",
                    description: "Bạn sẽ được chuyển đến trang quản lý ngay sau đây!",
                    showProgress: true,
                });
            } else {
                notification.error({
                    message: "Đăng nhập thất bại",
                    description: "Email hoặc mật khẩu không đúng.",
                    showProgress: true,
                });
            }
        } catch (error) {
            console.log(error);
            notification.error({
                message: "Đăng nhập thất bại",
                description: "Đã xảy ra lỗi khi kiểm tra thông tin đăng nhập.",
                showProgress: true,
            });
        }
    };

    // Trường hợp mặc định là sai
    const onFinishFailed = () => {
        notification.error({
            message: "Đăng nhập thất bại",
            description: "Vui lòng kiểm tra lại thông tin của bạn.",
            showProgress: true,
        });
    };

    return (
        <Form
            form={form}
            name="login"
            className="mt-8"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            {/* Email */}

            <div className=" w-full relative text-gray-400 focus-within:text-gray-600">
                <label htmlFor="" className=" text-base font-medium text-gray-900">
                    Email
                </label>
                <div className="flex w-full">
                    <div className="absolute z-10 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                        </svg>
                    </div>
                    <Form.Item
                        name="email"
                        className="w-full"
                        rules={[
                            {
                                required: true,
                                message: "Email không được để trống, vui lòng nhập lại!",
                            },
                            {
                                type: "email",
                                message: "Email không đúng định dạng, vui lòng nhập lại!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="a@gmail.com"
                            className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                        />
                    </Form.Item>
                </div>
            </div>

            {/* Password */}
            <div className=" w-full relative text-gray-400 focus-within:text-gray-600">
                <label htmlFor="" className="text-base font-medium text-gray-900">Mật khẩu</label>
                <div className="flex w-full">
                    <div className="absolute z-10 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                            />
                        </svg>
                    </div>
                    <Form.Item
                        className="w-full"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Mật khảu không được để trống, vui lòng nhập lại!",
                            },
                            {
                                min: 8,
                                message: "Mật khẩu phải dài hơn 8 ký tự, vui lòng nhập lại!",
                            },
                        ]}
                    >
                        <Input.Password
                            type="password"
                            placeholder="matkhausieukho"
                            className="w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                        />
                    </Form.Item>
                </div>
            </div>

            <Form.Item className="mt-2.5" name="remember" valuePropName="checked">
                <Checkbox className="text-sm text-gray-600">Ghi nhớ tài khoản</Checkbox>
            </Form.Item>

            <Form.Item className="mt-2.5">
                <Button
                    type="primary"
                    htmlType="submit"
                    className=" inline-flex items-center justify-center w-full px-4 py-7 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                >
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
