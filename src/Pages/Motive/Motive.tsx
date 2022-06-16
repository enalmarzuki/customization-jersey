import { Col, Row, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router';
import Layout from '../../Components/Reusables/Layout';
import Navbar from '../../Components/Reusables/Navbar';
import { ProductRecommendations } from '../../Data/Dummy/Constans/Home';
import Styles from './Motive.module.scss';

const { Title } = Typography;

const Motive: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={Styles['container']}>
      <Navbar isActive={'Home'} />
      <Layout>
        <Title level={3} className={Styles['title-home']}>
          Pilih Motif
        </Title>

        <Row gutter={[24, 24]}>
          {ProductRecommendations.map((product) => (
            <Col span={8} key={product.id}>
              <div
                className={Styles['card-rekomendasi']}
                onClick={() => navigate('/customization')}
              >
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

export default Motive;
