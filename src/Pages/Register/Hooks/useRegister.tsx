import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router';
import { INITIAL_VALUE_FORM_REGISTER } from '../../../Data/Constans/Login';
import RegisterSchema from './useRegister.validator';

export interface IUseRegister {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
}

export const useRegister = () => {
  const navigate = useNavigate();

  const onResetForm = async () => {
    await formik.setValues(INITIAL_VALUE_FORM_REGISTER);
  };

  const formik = useFormik<IUseRegister>({
    initialValues: INITIAL_VALUE_FORM_REGISTER,
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values));
      navigate('/', { replace: true });
    },
    onReset: onResetForm,
  });

  return {
    form: {
      formik,
    },
  };
};
