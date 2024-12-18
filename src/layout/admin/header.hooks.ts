import { useCallback, useState } from "react";
import useAuth from "../../hooks/redux/auth/useAuth";
import useMenu from "./useMenu";

export default function useHeader() {
  const [open, setOpen] = useState<boolean>(false);
  const { activeMenu, handleChange, menuItem } = useMenu();
  const { user, clearStore } = useAuth();

  const toggleDraw = () => {
    setOpen(!open);
  }

  const handleLogout = useCallback(() => {
    clearStore();
  }, [])

  return {
    open,
    activeMenu,
    menuItem,
    user,
    toggleDraw,
    handleLogout,
    handleChange
  }
}