import API from '../Config/axios';

export interface ICreateCheckoutProps {
  idClient: string;
  idOrder: string[];
  price: number;
}

export const CreateCheckout = (value: ICreateCheckoutProps) => {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append('idClient', value.idClient);
    value.idOrder.forEach((order, index) =>
      data.append(`idOrder[${index}]`, order)
    );
    data.append('price', value.price.toString());

    API.post('/checkout', data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
