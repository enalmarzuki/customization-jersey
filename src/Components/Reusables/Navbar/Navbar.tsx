import { Col, Row, Typography } from 'antd';
import React from 'react';
import Styles from './Navbar.module.scss';
import Logo from '../../../Assets/images/logo.png';
import DummyProfile from '../../../Data/Dummy/dummy-person.jpg';
import { useNavigate } from 'react-router';

const Menu = [
  {
    id: 1,
    text: 'Home',
    link: '/motive',
  },
  {
    id: 2,
    text: 'Pesanan',
    link: '/order',
  },
  {
    id: 3,
    text: 'Checkout',
    link: '/checkout',
  },
  {
    id: 3,
    text: 'Logout',
    link: '/',
  },
];

export interface INavbarProps {
  isActive: 'Home' | 'Pesanan' | 'Checkout';
}

const { Text } = Typography;

const Navbar: React.FC<INavbarProps> = ({ isActive }) => {
  const navigate = useNavigate();

  return (
    <div className={Styles['container']}>
      <Row justify="space-between" align="middle">
        <Col span={3}>
          <div className={Styles['img-wrapper']}>
            <img src={Logo} alt="logo.png" />
          </div>
        </Col>
        <Col span={6}>
          <div className={Styles['menu-wrapper']}>
            {Menu.map((item) => {
              return (
                <Text
                  key={item.id}
                  onClick={() =>
                    navigate(item.link, {
                      replace: item.link === '/',
                    })
                  }
                  className={
                    Styles[
                      `${
                        item.text === isActive
                          ? 'menu-text-active'
                          : 'menu-text'
                      }`
                    ]
                  }
                >
                  {item.text}
                </Text>
              );
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Navbar;
