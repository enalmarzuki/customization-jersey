import API from '../Config/axios';
import { IUseLogin } from '../Pages/Login/Hooks/useLogin';
import { IUseRegister } from '../Pages/Register/Hooks/useRegister';
export interface UserData {
  email: string;
  level: string;
  name: string;
}

export interface IAxiosResponse {
  data: UserData;
}

export const LoginUser = (values: IUseLogin) => {
  return new Promise((resolve, reject) => {
    API.post<IAxiosResponse>('/auth/login', values)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
