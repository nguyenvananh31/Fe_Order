import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, notification } from "antd";
import useAuth from "../../../../hooks/redux/auth/useAuth";
import { loginService } from "./LoginForm.services";
export const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  // Lấy dữ liệu từ local nếu người dùng đã từng lưu thông tin đăng nhập
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    // Nếu tồn tại thì set lại dữ liệu cho form
    if (storedEmail) {
      form.setFieldsValue({ email: storedEmail, remember: true });
    }
  }, [form]);

  // Xử lý dữ liệu khi ấn đăng nhập
  const onFinish = async (formData: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    const dataLogin: any = await loginService(formData);
    if (dataLogin && dataLogin !== undefined) {
      if (dataLogin.remember == true) {
        localStorage.setItem("rememberedEmail", dataLogin.email);
      }
      setAuth({ ...dataLogin.user, access_token: dataLogin.access_token, refresh_token: dataLogin.refresh_token });
      notification.success({
        message: "Đăng nhập thành công!",
        description: "Xin chào Admin!",
      });
      await navigate("/admin");
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
  return { onFinish, form, onFinishFailed };
};
