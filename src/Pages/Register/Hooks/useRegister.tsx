import { message } from 'antd';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { RegisterUser } from '../../../API/Register';
import { INITIAL_VALUE_FORM_REGISTER } from '../../../Data/Constans/Login';
import Register from '../Register';
import RegisterSchema from './useRegister.validator';

export interface IUseRegister {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
}

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onResetForm = async () => {
    await formik.setValues(INITIAL_VALUE_FORM_REGISTER);
  };

  const onSuccessRegister = () => {
    message.success('Pendaftaran berhasil');
  };

  const onFailedRegister = () => {
    message.error('Pendaftaran gagal');
  };

  const formik = useFormik<IUseRegister>({
    initialValues: INITIAL_VALUE_FORM_REGISTER,
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      RegisterUser(values)
        .then((res) => {
          onSuccessRegister();
          navigate('/', { replace: true });
          return res;
        })
        .catch((err) => {
          onFailedRegister();
          return err;
        })
        .finally(() => setIsLoading(false));
    },
    onReset: onResetForm,
  });

  return {
    form: {
      formik,
      isLoading,
    },
  };
};
