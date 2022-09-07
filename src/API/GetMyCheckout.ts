import API from '../Config/axios';

export const GetMyCheckout = (id: string) => {
  return new Promise((resolve, reject) => {
    API.get(`/checkout/AllCheckoutByClient/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
