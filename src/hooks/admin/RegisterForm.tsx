import { Form, Input, Button, Checkbox, notification } from 'antd';
import axios from 'axios';
import 'animate.css';
const RegisterForm = () => {
    const [form] = Form.useForm();

    const onFinish = async (values: {
        fullName: string;
        email: string;
        password: string;
        confirmPassword: string;
        remember: boolean;
    }) => {
        try {
            // Lấy dữ liệu mẫu từ database
            const { data } = await axios.get('');
            const dataUser = data;

            // Kiểm tra dữ liệu được người dùng nhập vào với dữ liệu ở trong database
            const isCheck = dataUser.find((user: { email: string; password: string }) =>
                user.email === values.email && user.password === values.password
            );
            if (isCheck) {
                notification.error({
                    message: "Đăng ký thất bại",
                    description: "Email đã được sử dụng, vui lòng nhập email khác!",
                });
            } else {
                if (values.password !== values.confirmPassword) {
                    notification.error({
                        message: "Đăng ký thất bại",
                        description: "Mật khẩu không trùng khớp!",
                    });
                    return;
                }
                else {
                    const registerUser = await axios.post('http://localhost:3000/', dataUser)
                    if (registerUser && registerUser !== null && registerUser !== undefined) {
                        notification.success({
                            message: "Đăng ký thành công",
                            description: "Bạn sẽ được chuyển tới trang Dashboard",
                        });
                    } else {
                        notification.error({
                            message: "Đăng ký thất bại",
                            description: "Có lỗi xảy ra khi thêm mới dữ liệu",
                        });
                    }

                }

            }
        } catch (error) {
            console.log(error);
            notification.error({
                message: "Đăng ký thất bại",
                description: "Có lỗi xảy ra khi lấy dữ liệu",
            });
        }
    };

    const onFinishFailed = () => {
        notification.error({
            message: "Đăng ký thất bại",
            description: "Có lỗi xảy ra khi lấy dữ liệu",
        });
    };
    return (
        <Form
            form={form}
            name="register"
            className="mt-4"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            {/* Họ và tên */}
            <div className="animate__animated animate__backInRight w-full relative text-gray-400 focus-within:text-gray-600">
                <label
                    htmlFor=""
                    className=" text-base font-medium text-gray-900 "
                >
                    Họ và Tên
                </label>
                <div className="flex w-full items-center">
                    <div className="absolute z-10 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            ></path>
                        </svg>
                    </div>
                    <Form.Item
                        className="w-full"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: "Tên không được để trống, vui lòng nhập lại!",
                            },
                            {
                                min: 2,
                                message: "Tên phải dài hơn 2 ký tự, vui lòng nhập lại!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nguyễn Văn A"
                            className=" block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                        />
                    </Form.Item>
                </div>
            </div>

            {/* Email */}
            <div className=" animate__animated animate__backInRight w-full relative text-gray-400 focus-within:text-gray-600">
                <label
                    htmlFor=""
                    className=" text-base font-medium text-gray-900"
                >
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
                            { required: true, message: "Email không được để trống, vui lòng nhập lại!" },
                            {
                                type: "email",
                                message: "Email không đúng định dạng, vui lòng nhập lại!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="a@gmail.com"
                            className=" w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                        />
                    </Form.Item>
                </div>
            </div>

            {/* Password */}
            <div className=" animate__animated animate__backInRight w-full relative text-gray-400 focus-within:text-gray-600">
                <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                >
                    Mật khẩu
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
                                min: 6,
                                message: "Mật khẩu phải dài hơn 6 ký tự, vui lòng nhập lại!",
                            },
                        ]}
                    >
                        <Input.Password
                            type="password"
                            placeholder="matkhausieukho"
                            className=" w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                        />
                    </Form.Item>
                </div>
            </div>

            {/* Confirm Password */}
            <div className=" animate__animated animate__backInRight w-full relative text-gray-400 focus-within:text-gray-600">
                <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                >
                    Nhập lại mật khẩu
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
                                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                            />
                        </svg>
                    </div>
                    <Form.Item
                        className="w-full"
                        name="confirmPassword"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Mật khẩu không trùng khớp, vui lòng kiểm tra lại!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("Mật khẩu không trùng khớp, vui lòng kiểm tra lại!")
                                    );
                                },
                            }),
                        ]}
                    >

                        <Input.Password
                            placeholder="matkhausieukho"
                            className=" w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                        />
                    </Form.Item>
                </div>

            </div>

            {/* Check box */}
            <div className="">
                <Form.Item
                    className=" relative text-gray-400 focus-within:text-gray-600"
                    name="agree"
                    valuePropName="checked"
                    rules={[
                        {
                            required: true,
                            message: "You must agree to the privacy policy & terms!",
                        },
                    ]}
                >
                    <Checkbox>
                        Tôi đồng ý với <a href="#">Điều khoản</a> & <a href="#">Thỏa thuận</a>
                    </Checkbox>
                </Form.Item>
            </div>

            {/* Button submit */}
            <div className="">
                <Form.Item className=" relative text-gray-400 focus-within:text-gray-600">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="inline-flex items-center justify-center w-full px-4 py-7 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80"
                    >
                        Đăng ký
                    </Button>
                </Form.Item>
            </div>
        </Form>
    )
}

export default RegisterForm