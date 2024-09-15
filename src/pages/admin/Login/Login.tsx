
import 'antd/dist/reset.css';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from "antd";
import { LoginForm } from './utils/LoginForm.hooks';

const Login = () => {
    const { ...hooks } = LoginForm();
    return (
        <section className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24 ">
                    <div className="animate__animated animate__bounceInUp xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                            Đăng nhập
                        </h2>
                        <p className="mt-2 text-base text-gray-600">
                            Bạn chưa có tài khoản?{" "}
                            <Link
                                to={`/register`}
                                title=""
                                className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700"
                            >
                                Tạo tài khoản ngay!
                            </Link>
                        </p>
                        <Form
                            form={hooks.form}
                            name="login"
                            className="mt-8"
                            initialValues={{ remember: true }}
                            onFinish={hooks.onFinish}
                            onFinishFailed={hooks.onFinishFailed}
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
                                Đăng nhập với Google
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
                                Đăng nhập với Facebook
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
                    <div>
                        <img
                            className="w-full mx-auto"
                            src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/1/cards.png"
                            alt=""
                        />
                        <div className="w-full max-w-md mx-auto xl:max-w-xl">
                            <h3 className="text-2xl font-bold text-center text-black">
                                Design your own card
                            </h3>
                            <p className="leading-relaxed text-center text-gray-500 mt-2.5">
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                                sint. Velit officia consequat duis.
                            </p>
                            <div className="flex items-center justify-center mt-10 space-x-3">
                                <div className="bg-orange-500 rounded-full w-20 h-1.5" />
                                <div className="bg-gray-200 rounded-full w-12 h-1.5" />
                                <div className="bg-gray-200 rounded-full w-12 h-1.5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;

