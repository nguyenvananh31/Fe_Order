import { RouteConfig } from "@/constants/path";
import useToast from "@/hooks/useToast";
import ApiUtils from "@/utils/api/api.utils";
import localStorageUtils, { KeyStorage } from "@/utils/local-storage.utils";
import { Avatar, Button, Form, Input } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassPage = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const toast = useToast();

    const token = useMemo(() => {
        const token = localStorageUtils.getObject(KeyStorage.FORGOT) || '';
        if (!token?.token) {
            navigate(RouteConfig.LOGIN);
        }
        return token;
    }, []);

    const handleSubmitForm = useCallback(async (values: any) => {
        try {
            setLoading(true);
            await apiResetPass({
                ...token,
                password: values?.password,
                password_confirmation: values?.password,
            });
            toast.showSuccess('Thay đổi mật khẩu thành công!');
            localStorageUtils.remove(KeyStorage.FORGOT);
            navigate(RouteConfig.LOGIN);
        } catch (error: any) {
            console.log(error);
            toast.showError(error);
            setLoading(false);
        }
    }, [token]);

    const apiResetPass = async (boby: any) => {
        return await ApiUtils.post<any, any>('/api/reset-password', boby);
    }

    return <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm  text-center">
                <div className="flex justify-center">
                    <Avatar src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' />
                    <h1 className="text-xl font-bold ml-1">Nhà Hàng Yagi</h1>
                </div>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Quên mật khẩu
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
                    {/* Password */}
                    <div className=" animate__animated animate__backInRight w-full relative text-gray-400 focus-within:text-gray-600">
                        <label
                            htmlFor=""
                            className="text-base font-medium text-gray-900"
                        >
                            Mật khẩu mới
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
                    <Form.Item>
                        <Button loading={loading} htmlType={'submit'} className="w-full mt-4" type="primary">Xác nhận</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </>
}

export default ResetPassPage;

