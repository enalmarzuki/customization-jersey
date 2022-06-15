import { Col, Row, Typography } from 'antd';
import React from 'react';
import Gap from '../../Components/Reusables/Gap';
import FormRegister from './Components/FormRegister';
import { useRegister } from './Hooks/useRegister';
import Styles from './Register.module.scss';

const { Text, Title } = Typography;

const Register: React.FC = () => {
  const useRegisterHooks = useRegister();
  const { form } = useRegisterHooks;

  return (
    <div className={Styles['container']}>
      <div className={Styles['image-wrapper']}></div>
      <Row align="middle" justify="center" style={{ width: '35vw' }}>
        <Col span={18}>
          <Title level={3} className={Styles['title-form']}>
            Registrasi
          </Title>
          <Text className={Styles['title-description']}>
            Lengkapi data diri anda
          </Text>
          <Gap height={16} />
          <Row justify="center">
            <Col span={24}>
              <FormRegister formik={form.formik} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
