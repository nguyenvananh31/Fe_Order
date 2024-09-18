import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/redux/auth/useAuth";

export default function useHeader() {
    const [open, setOpen] = useState<boolean>(false);
    const loaction = useLocation();
    const [activeMenu, setActiveMenu] = useState<string[]>(['']);
    const { clearStore } = useAuth();

    useEffect(() => {
        const menu: string = loaction.pathname.split('/').pop() || '';
        setActiveMenu([menu]);
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