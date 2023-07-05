import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

function NavLayout() {
  return (
    <>
      <Header /> <Outlet />
    </>
  );
}

export default NavLayout;
