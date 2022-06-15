import * as yup from 'yup';
import { IUseLogin } from './useLogin';

const LoginSchema = (): yup.SchemaOf<IUseLogin> =>
  yup
    .object()
    .shape({
      email: yup.string().required('Email tidak boleh kosong'),
      password: yup.string().required('Kata sandi tidak boleh kosong'),
    })
    .defined();
export default LoginSchema;
