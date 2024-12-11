import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { menuActive, menuPath } from "../../constants/path";
import { LISTMENU } from "./menu";
import useAuth from "../../hooks/redux/auth/useAuth";
import { ROLES } from "../../constants/enum";


export default function useMenu() {
  const loaction = useLocation();
  const [activeMenu, setActiveMenu] = useState<(string | any)[]>(['']);
  const [refresh, setRefresh] = useState<boolean>(false);
  const { user } = useAuth();

  const menuItem = useMemo(() => {
    let menu = [...LISTMENU];
    const roles = user?.roles?.map(i => i.name);
    if (roles.includes(ROLES.ADMIN) || roles.includes(ROLES.QTV)) {
      return menu;
    }
    
    menu.filter((i: any) => !roles.includes(i?.permission));

    return menu;
  }, [user]);

  useEffect(() => {
    let menu: string = loaction.pathname.split('/').pop() || '';

    if (+menu) {
      let pathParts = location.pathname.split('/');
      menu = pathParts[pathParts.length - 2] || '';
    }

    // if (menu != activeMenu[0] && menu && activeMenu[0]) {
    //   showSideOder(false, 0);
    // }

    if (menuPath[menu]) {
      setActiveMenu([menuActive[menu] || menu, [menuPath[menu]]]);
    } else {
      setActiveMenu([menu]);
    }
  }, [loaction, refresh]);

  const handleChange = (openKeys: string[], isClose: boolean = false, noThing?: boolean) => {
    if (noThing) return;
    if (isClose) {
      setRefresh(prev => !prev);
      return;
    }
    setActiveMenu(prev => [prev[0], openKeys]);
  }

  return {
    menuItem,
    activeMenu,
    handleChange
  }
}