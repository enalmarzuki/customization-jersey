import { useFormik } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import { PostOrder } from '../../../API/PostOrder';
import API from '../../../Config/axios';
import CustomizationSchema from './useCustomization.validator';

export interface IPlayer {
  name: string;
  backNumber: string;
  size: string;
}

export interface IUseCustomization {
  orderName: string;
  orderEmail: string;
  orderPhone: string;
  pickUpDate: string;
  fontPlayerName: string;
  fontBackNumber: string;
  cloth: string;
  motive: string;
  players: IPlayer[];
  image: any;
}

const INTIAL_VALUE_FORMIK = {
  orderName: '',
  orderEmail: '',
  orderPhone: '',
  pickUpDate: moment().format('YYYY-MM-DD'),
  fontPlayerName: '',
  fontBackNumber: '',
  cloth: '',
  motive: '',
  players: [
    {
      name: '',
      backNumber: '',
      size: '',
    },
  ],
  image: '',
};

export const useCustomization = () => {
  const [isLoading, setIsLoading] = useState(false);
  const resetFormik = async () => {
    await formik.setValues(INTIAL_VALUE_FORMIK);
  };

  const formik = useFormik<IUseCustomization>({
    initialValues: INTIAL_VALUE_FORMIK,
    validationSchema: CustomizationSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      console.log('values >>', values);

      setIsLoading(true);
      PostOrder(values)
        .then((res) => console.log('res >>', res))
        .catch((err) => console.log('err', err))
        .finally(() => setIsLoading(false));
    },
    onReset: resetFormik,
  });

  return {
    formik,
    isLoading,
  };
};
