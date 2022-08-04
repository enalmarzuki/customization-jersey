import React, { useEffect, useState } from 'react';
import { GetMyOrder } from '../../../API/GetMyOrder';
import API from '../../../Config/axios';
import useLocalStorage from '../../../Utils/Hooks/useLocalStorage/useLocalStorage';
import { IPlayer } from '../../Customization/Hooks/useCustomization';

export interface IMyOrder {
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
}

export const useOrder = () => {
  const [user, setUser] = useLocalStorage({ key: 'user', defaultValue: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [myOrders, setMyOrders] = useState<IMyOrder[]>();

  useEffect(() => {
    setIsLoading(true);
    GetMyOrder(user.id)
      .then((res: any) => setMyOrders(res.data.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    myOrders,
    isLoading,
  };
};
