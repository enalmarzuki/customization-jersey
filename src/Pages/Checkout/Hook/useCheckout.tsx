import React, { useEffect, useState } from 'react';
import { GetMyCheckout } from '../../../API/GetMyCheckout';
import { GetMyOrder } from '../../../API/GetMyOrder';
import API from '../../../Config/axios';
import useLocalStorage from '../../../Utils/Hooks/useLocalStorage/useLocalStorage';
import { IPlayer } from '../../Customization/Hooks/useCustomization';

export interface IMyCheckout {
  _id: string;
  idClient: string;
  orderEmail: string;
  orderName: string;
  orderPhone: string;
  pickUpDate: string;
  fontPlayerName: string;
  fontBackNumber: string;
  cloth: string;
  motive: string;
  players: IPlayer[];
  sample: string;
  payStatus: string;
  price: number;
  process?: string;
}

export const useCheckout = () => {
  const [user] = useLocalStorage({ key: 'user', defaultValue: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [myCheckout, setMyCheckout] = useState<IMyCheckout[]>();

  useEffect(() => {
    setIsLoading(true);
    GetMyCheckout(user.id)
      .then((res: any) => setMyCheckout(res.data.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    myCheckout,
    isLoading,
  };
};
