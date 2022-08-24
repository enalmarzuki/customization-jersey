import API from '../Config/axios';
import { IUseCustomization } from '../Pages/Customization/Hooks/useCustomization';

export const PostOrder = (value: IUseCustomization) => {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append('idClient', value.idClient);
    data.append('orderName', value.orderName);
    data.append('orderPhone', value.orderPhone);
    data.append('orderEmail', value.orderEmail);
    data.append('pickUpDate', value.pickUpDate);
    data.append('motive', value.motive);
    data.append('fontPlayerName', value.fontPlayerName);
    data.append('fontBackNumber', value.fontBackNumber);
    data.append('cloth', value.cloth);
    data.append('players', JSON.stringify(value.players));
    data.append('image', value.image);
    data.append('price', value.price.toString());

    API.post('order/', data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
