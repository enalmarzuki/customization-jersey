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
import React, { ChangeEvent, useEffect, useState } from 'react';
import Navbar from '../../Components/Reusables/Navbar';
import Styles from './Order.module.scss';
import IMGDummy from '../../Assets/cloth/img-cloth-milano.png';
import Layout from '../../Components/Reusables/Layout';
import Gap from '../../Components/Reusables/Gap';
import useLocalStorage from '../../Utils/Hooks/useLocalStorage/useLocalStorage';
import { IMyOrder, useOrder } from './Hook/useOrder';
import { Loading } from '../../Components/Reusables/Loading/Loading';
import { CardOrder } from '../../Components/Reusables/CardOrder/CardOrder';
import { UploadOutlined } from '@ant-design/icons';
import API from '../../Config/axios';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import NumberFormat from 'react-number-format';
import { CreateCheckout } from '../../API/CreateCheckout';
import { useNavigate } from 'react-router';

const { Title, Text } = Typography;

const Order = () => {
  const useMyOrder = useOrder();
  const navigate = useNavigate();

  const [user] = useLocalStorage({ key: 'user', defaultValue: '' });
  const [isShowModal, setIsShowModal] = useState(false);
  const [idOder, setIdOder] = useState<IMyOrder[]>([]);
  const [filePayment, setFilePayment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultCheckout, setResultCheckout] = useState(0);

  const onShowPaymentReceipt = (
    event: CheckboxChangeEvent,
    dataOrder: IMyOrder
  ) => {
    if (event.target.checked) {
      setIdOder([...idOder, dataOrder]);
    } else {
      const filterIdOrder = idOder.filter((data) => data._id !== dataOrder._id);
      setIdOder([...filterIdOrder]);
    }
  };

  // const onSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files?.length) {
  //     return message.info('Gagal Upload Bukti Pembayaran');
  //   }
  //   setFilePayment(e.target.files[0]);
  // };

  // const onClickOk = () => {
  //   setIsLoading(true);
  //   const formData = new FormData();
  //   formData.append('image', filePayment);

  //   API.put(`/order/updatePaymentReceipt/${idOder}`, formData)
  //     .then((res) => res)
  //     .catch((err) => err)
  //     .finally(() => {
  //       setIsLoading(false);
  //       onShowPaymentReceipt('');
  //     });
  // };

  const onClickCheckout = async () => {
    setIsLoading(true);
    const dataCheckout = {
      idClient: user.id,
      idOrder: idOder.map((order) => order._id),
      price: resultCheckout,
    };

    CreateCheckout(dataCheckout)
      .then(() => navigate('/success-book'))
      .catch((err) => console.log('err', err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const tempResult = idOder.reduce(
      (prev, value) => prev + (value.price || 0),
      0
    );
    setResultCheckout(tempResult);
  }, [idOder]);

  return (
    <div className={Styles['container']}>
      <Navbar isActive="Pesanan" />

      {useMyOrder.isLoading ? (
        <Loading />
      ) : (
        <Layout>
          <Row gutter={[16, 16]}>
            {useMyOrder.myOrders?.map((item) => (
              <Col key={item._id} span={12}>
                <div>
                  <CardOrder
                    data={item}
                    onClick={(e) => onShowPaymentReceipt(e, item)}
                    onShowModal={() => {}}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Layout>
      )}

      <Gap height={70} />

      <div className={Styles['footer-wrapper']}>
        <div className={Styles['footer-text']}>
          <Text>Total Pesanan : </Text>
          <Gap width={30} />
          <NumberFormat
            displayType="text"
            prefix="Rp. "
            value={resultCheckout}
            decimalSeparator=","
            thousandSeparator="."
            renderText={(value) => <Title level={5}>{value}</Title>}
          />
        </div>
        <Button
          type="primary"
          shape="round"
          size="large"
          disabled={!idOder.length || isLoading}
          loading={isLoading}
          onClick={onClickCheckout}
        >
          Buat Pesanan
        </Button>
      </div>

      {/* <Modal
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
      </Modal> */}
    </div>
  );
};

export default Order;
