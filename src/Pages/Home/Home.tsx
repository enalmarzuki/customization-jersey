import { Card, Col, Row, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router';
import IMGHome from '../../Assets/images/img-home.png';
import Gap from '../../Components/Reusables/Gap';
import Layout from '../../Components/Reusables/Layout';
import Navbar from '../../Components/Reusables/Navbar';
import { ProductRecommendations } from '../../Data/Dummy/Constans/Home';
import Styles from './Home.module.scss';

const { Title } = Typography;

const { Meta } = Card;

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={Styles['container']}>
      <Navbar isActive={'Home'} />
      <Layout>
        <Title level={3} className={Styles['title-home']}>
          Selamat Datang, Sarmili
        </Title>
        <Row>
          <Col span={24}>
            <Card
              hoverable
              className={Styles['card-custom']}
              onClick={() => navigate('/motive')}
              cover={
                <img
                  src={IMGHome}
                  className={Styles['card-custom-img']}
                  alt="img-login.png"
                />
              }
            >
              <Meta
                className={Styles['card-custom-meta']}
                title="KUSTOMISASI JERSEY"
              />
            </Card>
          </Col>
        </Row>
        <Gap height={50} />

        <Title level={3} className={Styles['title-home']}>
          Rekomendasi
        </Title>

        <Row gutter={[24, 24]}>
          {ProductRecommendations.map((product) => (
            <Col span={8} key={product.id}>
              <div className={Styles['card-rekomendasi']}>
                <img
                  className={Styles['card-rekomendasi-img']}
                  src={product.image}
                  alt={product.alt}
                />
              </div>
            </Col>
          ))}
       </Row>
      </Layout>
  

    </div>
  );
};

export default Home;
