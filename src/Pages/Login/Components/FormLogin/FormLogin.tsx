import { Button, Form, Input, Typography } from 'antd';
import { FormikProps } from 'formik';
import React from 'react';
import Gap from '../../../../Components/Reusables/Gap';
import { IUseLogin } from '../../Hooks/useLogin';
import Styles from './FormLogin.module.scss';
import { Link } from 'react-router-dom';

export interface IFormLoginProps {
  formik: FormikProps<IUseLogin>;
  isLoading: boolean;
}

const { Text } = Typography;

const FormLogin: React.FC<IFormLoginProps> = ({ formik, isLoading }) => {
  return (
    <Form id="form-login">
      <div>
        <Text className={Styles['form-title']}>Email</Text>
        <Gap height={6} />
        <Input
          name="email"
          onChange={formik.handleChange}
          size="large"
          placeholder="Ketik disini"
          autoComplete="off"
        />
        {formik.errors.email && formik.touched.email && (
          <>
            <Gap height={2} />
            <Text type="danger">{formik.errors.email}</Text>
          </>
        )}
      </div>

      <Gap height={10} />

      <div>
        <Text>Kata Sandi</Text>
        <Gap height={6} />
        <Input.Password
          name="password"
          size="large"
          onChange={formik.handleChange}
          placeholder="Ketik disini"
          autoComplete="off"
        />

        {formik.errors.password && formik.touched.password && (
          <>
            <Gap height={2} />
            <Text type="danger">{formik.errors.password}</Text>
          </>
        )}
      </div>

      <Gap height={10} />

      <Button
        loading={isLoading}
        form="form-login"
        size="large"
        className={Styles['btn-login']}
        onClick={() => formik.handleSubmit()}
      >
        Masuk
      </Button>

      <div className={Styles['form-link']}>
        <Text className={Styles['text-link']}>
          Belum punya akun ? <Link to="register">Daftar</Link>
        </Text>
      </div>
    </Form>
  );
};

export default FormLogin;
