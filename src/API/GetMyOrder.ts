import API from '../Config/axios';

export const GetMyOrder = (id: string) => {
  return new Promise((resolve, reject) => {
    API.get(`/order/AllOrderByClient/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
