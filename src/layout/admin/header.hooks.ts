import { useCallback, useState } from "react";
import useAuth from "../../hooks/redux/auth/useAuth";
import useMenu from "./useMenu";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";

export default function useHeader() {
  const [open, setOpen] = useState<boolean>(false);
  const { activeMenu, handleChange } = useMenu();
  const { clearStore } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const toggleDraw = () => {
    setOpen(!open);
  }

  const handleLogout = useCallback(() => {
    clearStore();
    navigate('/login');
    toast.showSuccess('Đăng xuất thành công');
  }, [])

  return {
    open,
    activeMenu,
    toggleDraw,
    handleLogout,
    handleChange
  }
}