import React from 'react';
import Gap from '../../../../Components/Reusables/Gap';
import { Button, Image, Popover, Tooltip, Typography } from 'antd';
import Styles from './CardOrder.module.scss';
import { IMyOrder } from '../../Hook/useOrder';
import moment from 'moment';
import { EditOutlined } from '@ant-design/icons';

export interface ICardOrderProps {
  data: IMyOrder;
  onClick: () => void;
}

const { Text } = Typography;

export const CardOrder: React.FC<ICardOrderProps> = ({ data, onClick }) => {
  return (
    <div className={Styles['card-wrapper']}>
      <div className={Styles['card-img-wrapper']}>
        <Image src={data.sample} alt={data.sample} width={300} />
      </div>
      <Gap width={16} />

      <div className={Styles['card-content']}>
        <div className={Styles['card-body']}>
          <div className={Styles['card-body-header']}>
            <Text
              className={
                Styles[
                  `${
                    data.payStatus === 'Sudah Terbayar'
                      ? 'status-payment-success'
                      : 'status-payment-pending'
                  }`
                ]
              }
            >
              {data.payStatus}
            </Text>

            <Tooltip title="Upload Bukti Pembayaran">
              <Button
                type="primary"
                ghost
                icon={<EditOutlined />}
                onClick={onClick}
              />
            </Tooltip>
          </div>
          <Gap height={16} />
          <div className={Styles['card-body-text-wrapper']}>
            <Text className={Styles['card-body-text']}>Nama Pemesan</Text>
            <Text className={Styles['card-body-title']}>{data.orderName}</Text>
          </div>
          <Gap height={16} />
          <div className={Styles['card-body-text-wrapper']}>
            <Text className={Styles['card-body-text']}>Tanggal Ambil</Text>
            <Text className={Styles['card-body-title']}>
              {moment(data.pickUpDate).format('DD MMMM YYYY')}
            </Text>
          </div>
          <Gap height={16} />
          <div className={Styles['card-body-text-wrapper']}>
            <Text className={Styles['card-body-text']}>Status</Text>
            <Text className={Styles['card-body-title']}>Proses Cutting</Text>
          </div>
          <Gap height={16} />
        </div>

        {/* status-payment-pending */}
      </div>
    </div>
  );
};
