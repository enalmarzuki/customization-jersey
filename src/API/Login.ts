import API from '../Config/axios';
import { IUseLogin } from '../Pages/Login/Hooks/useLogin';
import { IUseRegister } from '../Pages/Register/Hooks/useRegister';

export const LoginUser = (values: IUseLogin) => {
  return new Promise((resolve, reject) => {
    API.post('/auth/login', values)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
