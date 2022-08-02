import { Row, Col, Typography } from 'antd';
import React from 'react';
import Layout from '../../Components/Reusables/Layout';
import Navbar from '../../Components/Reusables/Navbar';
import Styles from './SuccessBook.module.scss';
import IMGSuccess from '../../Assets/images/img-success.png';
import IMGBNI from '../../Assets/images/img-bni.png';
import IMGBRI from '../../Assets/images/img-bri.png';
import Gap from '../../Components/Reusables/Gap';
import { useNavigate } from 'react-router';

const DataBank = [
  {
    id: 1,
    name: 'Bank Negara Indonesia',
    label: 'BNI',
    accountNumber: '08123452324',
    accountName: 'Andika Febriyanto',
    image: IMGBNI,
  },
  {
    id: 2,
    name: 'Bank Rakyat Indonesia',
    label: 'BRI',
    accountNumber: '102135912305323',
    accountName: 'Andika Febriyanto',
    image: IMGBRI,
  },
];

const { Text, Title } = Typography;

const SuccessBook = () => {
  const navigate = useNavigate();
  return (
    <div className={Styles['container']}>
      <Navbar isActive={'Home'} />
      <Layout>
        <Row justify="center">
          <Col>
            <Title level={3}>Pesanan Berhasil Di Buat</Title>
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <img src={IMGSuccess} alt="img-success.png" width={400} />
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <Title level={3}>Silahkan Melakukan Pembayaran</Title>
          </Col>
        </Row>
        <Row justify="center">
          {DataBank.map((item) => (
            <Col key={item.id} span={6}>
              <div className={Styles['bank-account-wrapper']}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={Styles['bank-image']}
                />
                <Gap width={24} />
                <div className={Styles['bank-description-wrapper']}>
                  <Text className={Styles['bank-account-number']}>
                    {item.accountNumber}
                  </Text>
                  <Text className={Styles['bank-account-name']}>
                    {item.accountName}
                  </Text>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Gap height={32} />
        <Row justify="center">
          <Col>
            <Title
              level={5}
              onClick={() => navigate('/motive', { replace: true })}
              style={{ cursor: 'pointer' }}
            >
              Halaman Utama
            </Title>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default SuccessBook;
