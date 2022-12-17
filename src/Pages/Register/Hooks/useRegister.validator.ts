import * as yup from 'yup';
import { IUseRegister } from './useRegister';

const RegisterSchema = (): yup.SchemaOf<IUseRegister> =>
  yup
    .object()
    .shape({
      email: yup.string().required('Email tidak boleh kosong'),
      password: yup.string().required('Kata sandi tidak boleh kosong'),
      confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password tidak sama")
      .required(),
      username: yup.string().required('Nama lengkap tidak boleh kosong'),
      phoneNumber: yup.string().required('Nomor HP tidak boleh kosong'),
    })
    .defined();
export default RegisterSchema;
