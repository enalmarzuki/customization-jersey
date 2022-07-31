import API from '../Config/axios';

export const GetAllMotive = () => {
  return new Promise((resolve, reject) => {
    API.get('/motif/all')
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
