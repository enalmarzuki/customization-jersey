import API from '../Config/axios';

export interface ICreateCheckoutProps {
  idClient: string;
  idOrder: string[];
  price: number;
}

export const CreateCheckout = (value: ICreateCheckoutProps) => {
  return new Promise((resolve, reject) => {
    const newData = {
      idClient: value.idClient,
      idOrder: value.idOrder,
      price: value.price,
    };

    API.post('/checkout', newData)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
