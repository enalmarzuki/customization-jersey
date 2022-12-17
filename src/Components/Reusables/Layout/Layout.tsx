import React from "react";
import Styles from "./Layout.module.scss";
import { ButtonWhatsapp } from "../ButtonWhatsapp/ButtonWhatsapp";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className={Styles["container"]}>
      {children}
      <ButtonWhatsapp />
    </div>
  );
};

export default Layout;
