import { Form, notification } from "antd";
import useAuth from "../../../../hooks/redux/auth/useAuth";
import { registerService } from "./RegisterForm.services";
import { useNavigate } from "react-router-dom";
export const RegisterForm = () => {
  const [form] = Form.useForm();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const onFinish = async (formData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    remember: boolean;
  }) => {
    const dataRegister: any = await registerService(formData);
    if (dataRegister && dataRegister !== undefined) {
      if (dataRegister.remember == true) {
        // localStorage.setItem('rememberedEmail', dataRegister.email);
      }
      setAuth({ ...dataRegister.user, token: dataRegister.token });
      notification.success({
        message: "Đăng ký thành công!",
        description: "Xin chào Admin!",
      });
      await navigate('/admin/dashboard')
    }
  };

  const onFinishFailed = () => {
    notification.error({
      message: "Đăng ký thất bại",
      description: "Có lỗi xảy ra khi lấy dữ liệu",
    });
  };
  return { onFinish, form, onFinishFailed };
};

export default RegisterForm;
