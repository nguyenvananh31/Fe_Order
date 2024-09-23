import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/redux/auth/useAuth";
import { menuActive, menuPath } from "../../constants/path";

export default function useHeader() {
    const [open, setOpen] = useState<boolean>(false);
    const loaction = useLocation();
    const [activeMenu, setActiveMenu] = useState<(string)[]>(['']);
    const { clearStore } = useAuth();

    useEffect(() => {
        let menu: string = loaction.pathname.split('/').pop() || '';
        
        if (+menu) {
          let pathParts = location.pathname.split('/');
          menu = pathParts[pathParts.length - 2] || '';
        }
        if (menuPath[menu]) {
          setActiveMenu([menuActive[menu] || menu, menuPath[menu]]);
        }else {
          setActiveMenu([menu]);
        }
    }, [loaction])

    const toggleDraw = () => {
        setOpen(!open);
    }

    const handleLogout = useCallback(() => {
        clearStore();
    }, [])

    return {
        open,
        activeMenu,
        toggleDraw,
        handleLogout
    }
}