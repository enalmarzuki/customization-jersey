import * as yup from 'yup';
import { IUseCustomization } from './useCustomization';

const CustomizationSchema = (): yup.SchemaOf<IUseCustomization> =>
  yup
    .object()
    .shape({
      orderName: yup.string().required('Nama Pemesan Tidak Boleh Kosong'),
      orderEmail: yup.string().required('Email Pemesan Tidak Boleh Kosong'),
      orderPhone: yup.string().required('Nomor Hp Tidak Boleh Kosong'),
      pickUpDate: yup.string().required('Tanggal Ambil Tidak Boleh Kosong'),
      fontPlayerName: yup.string().required('Tidak Boleh Kosong'),
      fontBackNumber: yup.string().required('Tidak Boleh Kosong'),
      cloth: yup.string().required('Tidak Boleh Kosong'),
      motive: yup.string().required('Tidak Boleh Kosong'),
      players: yup
        .array()
        .min(1, 'Minimal Pesanan 1pcs')
        .of(
          yup.object().shape({
            name: yup.string().required('Nama Pemain Tidak Boleh Kosong'),
            backNumber: yup
              .string()
              .required('Nomor Punggung Tidak Boleh Kosong'),
            size: yup.string().required('Ukuran Tidak Boleh Kosong'),
          })
        ),
      image: yup.mixed().required('Tidak Boleh Kosong'),
    })
    .defined();

export default CustomizationSchema;
