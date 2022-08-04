import {
  Button,
  Col,
  message,
  Modal,
  Row,
  Typography,
  Upload,
  UploadProps,
} from 'antd';
import React, { ChangeEvent, useState } from 'react';
import Navbar from '../../Components/Reusables/Navbar';
import Styles from './Order.module.scss';
import IMGDummy from '../../Assets/cloth/img-cloth-milano.png';
import Layout from '../../Components/Reusables/Layout';
import Gap from '../../Components/Reusables/Gap';
import useLocalStorage from '../../Utils/Hooks/useLocalStorage/useLocalStorage';
import { useOrder } from './Hook/useOrder';
import { Loading } from '../../Components/Reusables/Loading/Loading';
import { CardOrder } from './Components/CardOrder/CardOrder';
import { UploadOutlined } from '@ant-design/icons';
import API from '../../Config/axios';

const { Title, Text } = Typography;

const Order = () => {
  const useMyOrder = useOrder();
  const [isShowModal, setIsShowModal] = useState(false);
  const [idOder, setIdOder] = useState('');
  const [filePayment, setFilePayment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log('filePayment', filePayment);

  const onShowPaymentReceipt = (idOrder: string) => {
    setIdOder(idOrder);
    setIsShowModal(idOrder !== '');
  };

  const onSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return message.info('Gagal Upload Bukti Pembayaran');
    }
    setFilePayment(e.target.files[0]);
  };

  const onClickOk = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', filePayment);

    API.put(`/order/updatePaymentReceipt/${idOder}`, formData)
      .then((res) => res)
      .catch((err) => err)
      .finally(() => {
        setIsLoading(false);
        onShowPaymentReceipt('');
      });
  };

  if (useMyOrder.isLoading) {
    return <Loading />;
  }

  return (
    <div className={Styles['container']}>
      <Navbar isActive="Pesanan" />

      <Layout>
        <Row gutter={[16, 16]}>
          {useMyOrder.myOrders?.map((item) => (
            <Col key={item._id} span={12}>
              <div>
                <CardOrder
                  data={item}
                  onClick={() => onShowPaymentReceipt(item._id)}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Layout>

      <Modal
        title="Upload Bukti Pembayaran"
        visible={isShowModal}
        onOk={onClickOk}
        onCancel={() => onShowPaymentReceipt('')}
        footer={[
          <Button type="primary" loading={isLoading} onClick={onClickOk}>
            Kirim
          </Button>,
        ]}
      >
        <input type="file" onChange={onSelectImage} />
      </Modal>
    </div>
  );
};

export default Order;
