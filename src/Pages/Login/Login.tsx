import { Col, Row, Typography } from 'antd';
import React from 'react';
import Gap from '../../Components/Reusables/Gap';
import FormLogin from './Components/FormLogin';
import { useLogin } from './Hooks/useLogin';
import Styles from './Login.module.scss';

const { Text, Title } = Typography;

const Login: React.FC = () => {
  const useLoginHooks = useLogin();
  const { form } = useLoginHooks;

  return (
    <div className={Styles['container']}>
      <Row align="middle" justify="center" style={{ width: '35vw' }}>
        <Col span={18}>
          <Title level={3} className={Styles['title-form']}>
            Login
          </Title>
          <Text className={Styles['title-description']}>
            Masukkan email dan password
          </Text>
          <Gap height={16} />
          <Row justify="center">
            <Col span={24}>
              <FormLogin formik={form.formik} isLoading={form.isLoading} />
            </Col>
          </Row>
        </Col>
      </Row>

      <div className={Styles['image-wrapper']}></div>
    </div>
  );
};

export default Login;
