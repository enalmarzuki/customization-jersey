import { Col, Row, Typography } from 'antd';
import React from 'react';
import Styles from './Navbar.module.scss';
import Logo from '../../../Assets/images/logo.png';
import DummyProfile from '../../../Data/Dummy/dummy-person.jpg';

export interface INavbarProps {
  isActive: string;
}

const Navbar: React.FC<INavbarProps> = () => {
  return (
    <div className={Styles['container']}>
      <Row justify="center">
        <Col span={3}>
          <div className={Styles['img-wrapper']}>
            <img src={Logo} alt="logo.png" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Navbar;
