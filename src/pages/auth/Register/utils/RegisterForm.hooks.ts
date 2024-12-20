import { Form } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RouteConfig } from "../../../../constants/path";
import useToast from "../../../../hooks/useToast";
import { registerService } from "./RegisterForm.services";
export const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const toast = useToast();

  const onFinish = useCallback(async (formData: {
    name: string;
    email: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
    remember: boolean;
  }) => {
    try {
      const dataRegister: any = await registerService(formData);
      if (dataRegister && dataRegister !== undefined) {
        toast.showSuccess('Đăng ký tài khoản thành công!');
        navigate(RouteConfig.LOGIN);
      }
    } catch (error) {
      console.log(error);
      toast.showError(error as any);
    }
  }, []);

  const onFinishFailed = useCallback(() => {
    toast.showError('Vui lòng nhập đủ thông tin!');
  }, []);
  return { onFinish, form, onFinishFailed };
};

export default RegisterForm;
