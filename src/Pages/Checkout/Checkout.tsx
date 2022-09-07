import { Button, Col, message, Modal, Row, Typography } from 'antd';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { CardOrder } from '../../Components/Reusables/CardOrder/CardOrder';
import Layout from '../../Components/Reusables/Layout';
import { Loading } from '../../Components/Reusables/Loading/Loading';
import Navbar from '../../Components/Reusables/Navbar';
import API from '../../Config/axios';
import useLocalStorage from '../../Utils/Hooks/useLocalStorage/useLocalStorage';
import Styles from './Checkout.module.scss';
import { useCheckout } from './Hook/useCheckout';

const { Title, Text } = Typography;

const Checkout = () => {
  const useMyCheckout = useCheckout();
  const navigate = useNavigate();

  const [user] = useLocalStorage({ key: 'user', defaultValue: '' });
  const [isShowModal, setIsShowModal] = useState(false);
  const [idCheckout, setIdCheckout] = useState('');
  const [filePayment, setFilePayment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onShowModal = (id: string) => {
    setIdCheckout(id);
    setIsShowModal(true);
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

    API.put(`/checkout/updatePaymentReceipt/${idCheckout}`, formData)
      .then((res) =>
        message
          .loading('Sedang mengupload bukti pembayaran...')
          .then(() => message.success('Upload Bukti Pembayaran Berhasil'))
          .then(() => message.warning('Sedang Menunggu Konfirmasi Admin'))
      )
      .catch((err) => message.error('Upload Bukti Pembayaran Gagal'))
      .finally(() => {
        setIsLoading(false);
        setIsShowModal(false);
      });
  };

  console.log('useMyCheckout.myCheckout >>', useMyCheckout.myCheckout);

  return (
    <div className={Styles['container']}>
      <Navbar isActive="Checkout" />

      {useMyCheckout.isLoading ? (
        <Loading />
      ) : (
        <Layout>
          <Row gutter={[16, 16]}>
            {useMyCheckout.myCheckout?.map((item) => (
              <Col key={item._id} span={12}>
                <div>
                  <CardOrder
                    isCheckout
                    data={item}
                    onClick={(e) => setIsShowModal(true)}
                    onShowModal={(id) => onShowModal(id)}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Layout>
      )}

      <Modal
        title="Upload Bukti Pembayaran"
        visible={isShowModal}
        onOk={onClickOk}
        onCancel={() => setIsShowModal(false)}
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

export default Checkout;
