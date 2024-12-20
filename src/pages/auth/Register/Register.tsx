import "antd/dist/reset.css";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, } from 'antd';
import RegisterForm from "./utils/RegisterForm.hooks";
import { PhoneOutlined } from "@ant-design/icons";
const Register = () => {
    const { ...hook } = RegisterForm();

    return (
        <section className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
                    <div className="absolute inset-0">
                        <img
                            className="object-cover w-full h-full"
                            src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/4/girl-working-on-laptop.jpg"
                            alt=""
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                    <div className="relative">
                        <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
                            {/* <h3 className="text-4xl font-bold text-white">
                                Tham gia cùng trang web  &amp;{" "}
                                <br className="hidden xl:block" />
                                xây dựng trang web của bạn
                            </h3>
                            <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                        <svg
                                            className="w-3.5 h-3.5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white">
                                        {" "}
                                        Commercial License{" "}
                                    </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                        <svg
                                            className="w-3.5 h-3.5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white">
                                        {" "}
                                        Unlimited Exports{" "}
                                    </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                        <svg
                                            className="w-3.5 h-3.5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white">
                                        {" "}
                                        120+ Coded Blocks{" "}
                                    </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                        <svg
                                            className="w-3.5 h-3.5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white">
                                        {" "}
                                        Design Files Included{" "}
                                    </span>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16">
                    <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto animate__animated animate__bounceInUp">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl animate__animated animate__bounce">
                            Đăng ký tài khoản 🚀
                        </h2>
                        <p className="mt-2 text-base text-gray-600">
                            Bạn đã có tài khoản rồi?{" "}
                            <Link
                                to={`/login`}
                                title=""
                                className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
                            >
                                Đăng nhập ngay!
                            </Link>
                        </p>

                        <Form
                            form={hook.form}
                            name="register"
                            className="mt-4"
                            initialValues={{ remember: true }}
                            onFinish={hook.onFinish}
                            onFinishFailed={hook.onFinishFailed}
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
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <Form.Item
                                        className="w-full"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Tên không được để trống, vui lòng nhập lại!",
                                            },
                                            {
                                                min: 5,
                                                message: "Tên phải dài hơn 5 ký tự, vui lòng nhập lại!",
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

                            <div className="animate__animated animate__backInRight w-full relative text-gray-400 focus-within:text-gray-600">
                                <label
                                    htmlFor=""
                                    className=" text-base font-medium text-gray-900 "
                                >
                                    Số điện thoại
                                </label>
                                <div className="flex w-full items-center">
                                    <div className="absolute z-10 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <PhoneOutlined className="text-lg"/>
                                    </div>
                                    <Form.Item
                                        className="w-full"
                                        name="phone_number"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Số điện thoại là bắt buộc, vui lòng nhập lại!",
                                            },
                                            {
                                                pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                                                message: 'Số điện thoại không đúng định dạng!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="+84"
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
                                                min: 8,
                                                message: "Mật khẩu phải dài hơn 8 ký tự, vui lòng nhập lại!",
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
                                        name="password_confirmation"
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
                                            message: "Bạn phải đồng ý với chính sách và điều khoản về quyền riêng tư!",
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

                        <div className="mt-3 space-y-3">
                            <button
                                type="button"
                                className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                            >
                                <div className="absolute inset-y-0 left-0 p-4">
                                    <svg
                                        className="w-6 h-6 text-rose-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
                                    </svg>
                                </div>
                                Đăng ký với Google
                            </button>
                            <button
                                type="button"
                                className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                            >
                                <div className="absolute inset-y-0 left-0 p-4">
                                    <svg
                                        className="w-6 h-6 text-[#2563EB]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                                    </svg>
                                </div>
                                Đăng ký với Facebook
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
