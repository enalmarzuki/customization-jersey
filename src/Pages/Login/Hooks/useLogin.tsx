import { message } from 'antd';
import { Axios, AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { LoginUser } from '../../../API/Login';
import { INITIAL_VALUE_FORM_LOGIN } from '../../../Data/Constans/Login';
import LoginSchema from './useLogin.validator';

export interface IUseLogin {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onResetForm = async () => {
    await formik.setValues(INITIAL_VALUE_FORM_LOGIN);
  };

  const onErrorLogin = () => {
    message.error('Email/Kata sandi salah');
  };

  const formik = useFormik<IUseLogin>({
    initialValues: INITIAL_VALUE_FORM_LOGIN,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      LoginUser(values)
        .then((res) => {
          navigate('/home', { replace: true });
          return res;
        })
        .catch((err) => {
          onErrorLogin();
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
