import * as yup from 'yup';
import { IUseCustomization } from './useCustomization';

const CustomizationSchema = (): yup.SchemaOf<IUseCustomization> =>
  yup
    .object()
    .shape({
      customerName: yup.string().required('Nama Pemesan Tidak Boleh Kosong'),
      phoneNumber: yup.string().required('Nomor Hp Tidak Boleh Kosong'),
      pickUpDate: yup.string().required('Tanggal Ambil Tidak Boleh Kosong'),
      players: yup
        .array()
        .min(5, 'Minimal Pesanan 5pcs')
        .of(
          yup.object().shape({
            name: yup.string().required('Nama Pemain Tidak Boleh Kosong'),
            number: yup.string().required('Nomor Punggung Tidak Boleh Kosong'),
            size: yup.string().required('Ukuran Tidak Boleh Kosong'),
          })
        ),
    })
    .defined();

export default CustomizationSchema;
