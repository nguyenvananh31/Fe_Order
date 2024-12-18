import { RouteConfig } from "@/constants/path";
import useToast from "@/hooks/useToast";
import ApiUtils from "@/utils/api/api.utils";
import localStorageUtils, { KeyStorage } from "@/utils/local-storage.utils";
import { Avatar, Button, Form, Input } from "antd";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

interface IState {
    loading: boolean;
}

const initState: IState = {
    loading: false,
}

export default function ForgotPage() {

    const [state, setState] = useState<IState>(initState);
    const [form] = Form.useForm();
    const toast = useToast();

    const handleSubmitForm = useCallback(async (values: any) => {
        try {
            setState(prev => ({...prev, loading: true}));
            const res = await apiGetsendLinkToMail(values);
            if (res?.token) {
                localStorageUtils.set(KeyStorage.FORGOT, res.token);
                toast.showSuccess('Yêu cầu thành công! Vui lòng xem trong hòm thư!');
            }
            setState(prev => ({...prev, loading: false}));
        } catch (error: any) {
            console.log(error);
            toast.showError(error);
            setState(prev => ({...prev, loading: false}));
        }
    }, []);

    const apiGetsendLinkToMail = async (boby: any) => {
        return await ApiUtils.post<any, any>('/api/forgot-password', boby);
    }

    return (
        <>
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
                        <Form.Item name={'email'} label={'Email'}
                            rules={[
                                { required: true, message: "Email là bắt buộc!" }, // Xác định trường bắt buộc
                                { type: "email", message: "Email không hợp lệ!" }, // Xác định email hợp lệ
                            ]}
                        >
                            <Input size="large" placeholder="example@gmail.com" prefix={<svg
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
                            </svg>} />
                        </Form.Item>
                        <Form.Item>
                            <Button loading={state.loading} htmlType={'submit'} className="w-full mt-4" type="primary">Xác nhận</Button>
                        </Form.Item>
                    </Form>
                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Chưa có tài khoản?{' '}
                        <Link to={RouteConfig.REGISTER} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Đăng ký ngay!
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
