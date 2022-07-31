import API from '../Config/axios';
import { IUseRegister } from '../Pages/Register/Hooks/useRegister';

export const RegisterUser = (values: IUseRegister) => {
  const data = {
    name: values.username,
    email: values.email,
    password: values.password,
    phone: values.phoneNumber,
    level: 'user',
  };

  return new Promise((resolve, reject) => {
    API.post('auth/registration', data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
