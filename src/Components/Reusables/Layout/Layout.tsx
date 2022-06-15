import React from 'react';
import Styles from './Layout.module.scss';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return <div className={Styles['container']}>{children}</div>;
};

export default Layout;
