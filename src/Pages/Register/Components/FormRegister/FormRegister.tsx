import { Button, Form, Input, Typography } from 'antd';
import { FormikProps } from 'formik';
import React from 'react';
import Gap from '../../../../Components/Reusables/Gap';
import { IUseRegister } from '../../Hooks/useRegister';
import Styles from './FormRegister.module.scss';
import { Link } from 'react-router-dom';

export interface IFormRegisterProps {
  formik: FormikProps<IUseRegister>;
}

const { Text } = Typography;

const FormRegister: React.FC<IFormRegisterProps> = ({ formik }) => {
  return (
    <Form id="form-login">
      <div>
        <Text className={Styles['form-title']}>Usename</Text>
        <Gap height={6} />
        <Input
          name="username"
          onChange={formik.handleChange}
          size="large"
          placeholder="Ketik disini"
          autoComplete="off"
        />
        {formik.errors.username && formik.touched.username && (
          <>
            <Gap height={2} />
            <Text type="danger">{formik.errors.username}</Text>
          </>
        )}
      </div>

      <Gap height={10} />

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

      <div>
        <Text className={Styles['form-title']}>No. Hp</Text>
        <Gap height={6} />
        <Input
          name="phoneNumber"
          onChange={formik.handleChange}
          size="large"
          placeholder="Ketik disini"
          autoComplete="off"
        />
        {formik.errors.phoneNumber && formik.touched.phoneNumber && (
          <>
            <Gap height={2} />
            <Text type="danger">{formik.errors.phoneNumber}</Text>
          </>
        )}
      </div>

      <Gap height={10} />

      <Button
        form="form-login"
        size="large"
        className={Styles['btn-login']}
        onClick={() => formik.handleSubmit()}
      >
        Daftar
      </Button>

      <div className={Styles['form-link']}>
        <Text className={Styles['text-link']}>
          Sudah punya akun ? <Link to="/">Masuk</Link>
        </Text>
      </div>
    </Form>
  );
};

export default FormRegister;
