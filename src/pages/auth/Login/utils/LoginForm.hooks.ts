import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/redux/auth/useAuth";
import useToast from "../../../../hooks/useToast";
import { loginService } from "./LoginForm.services";
export const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { showError , showSuccess} = useToast();

  // Xử lý dữ liệu khi ấn đăng nhập
  const onFinish = async (formData: {
    email: string;
    password: string;
    remember: boolean;
  }) => {

    try {
      const dataLogin: any = await loginService(formData);
      if (dataLogin && dataLogin !== undefined) {
        setAuth({ ...dataLogin.user, access_token: dataLogin.access_token, refresh_token: dataLogin.refresh_token });
        showSuccess('Đăng nhập thành công!');
        navigate("/admin");
      }
    } catch (error) {
      showError('Tài khoản hoặc mật khẩu chưa chính xác!');
    }
  };

  const onFinishFailed = () => {
    showError('Vui lòng nhập đủ thông tin!')
  };
  return { onFinish, form, onFinishFailed };
};
