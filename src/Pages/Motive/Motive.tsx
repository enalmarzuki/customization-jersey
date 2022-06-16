import { Col, Row, Typography } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Layout from '../../Components/Reusables/Layout';
import Navbar from '../../Components/Reusables/Navbar';
import { ProductRecommendations } from '../../Data/Dummy/Constans/Home';
import { SET_MOTIVE } from '../../Store/type';
import Styles from './Motive.module.scss';

const { Title } = Typography;

const Motive: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickMotive = (img: string) => {
    dispatch({ type: SET_MOTIVE, value: img });
    navigate('/customization');
  };

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
                onClick={() => onClickMotive(product.image)}
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
