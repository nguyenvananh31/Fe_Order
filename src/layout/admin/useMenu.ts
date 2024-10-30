import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { menuActive, menuPath } from "../../constants/path";


export default function useMenu() {
  const loaction = useLocation();
  const [activeMenu, setActiveMenu] = useState<(string | any)[]>(['']);
  const [refresh, setRefresh] = useState<boolean>(false);

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
    setActiveMenu(prev=> [prev[0], openKeys]);
  }

  return {
    activeMenu,
    handleChange
  }
}