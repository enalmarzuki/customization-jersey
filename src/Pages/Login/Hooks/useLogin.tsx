import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { INITIAL_VALUE_FORM_LOGIN } from '../../../Data/Constans/Login';
import LoginSchema from './useLogin.validator';

export interface IUseLogin {
  email: string;
  password: string;
}

export const useLogin = () => {
  const navigate = useNavigate();

  const onResetForm = async () => {
    await formik.setValues(INITIAL_VALUE_FORM_LOGIN);
  };

  const formik = useFormik<IUseLogin>({
    initialValues: INITIAL_VALUE_FORM_LOGIN,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values));
      navigate('/home', { replace: true });
    },
    onReset: onResetForm,
  });

  return {
    form: {
      formik,
    },
  };
};
