import { useFormik } from 'formik';
import moment from 'moment';
import CustomizationSchema from './useCustomization.validator';

export interface IPlayer {
  name: string;
  number: string;
  size: string;
}

export interface IUseCustomization {
  customerName: string;
  phoneNumber: string;
  pickUpDate: string;
  players: IPlayer[];
}

const INTIAL_VALUE_FORMIK = {
  customerName: '',
  phoneNumber: '',
  pickUpDate: moment().format('YYYY-MM-DD'),
  players: [
    {
      name: '',
      number: '',
      size: '',
    },
  ],
};

export const useCustomization = () => {
  const resetFormik = async () => {
    await formik.setValues(INTIAL_VALUE_FORMIK);
  };

  const formik = useFormik<IUseCustomization>({
    initialValues: INTIAL_VALUE_FORMIK,
    validationSchema: CustomizationSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      console.log('values >>', values);
    },
    onReset: resetFormik,
  });

  return {
    formik,
  };
};
