import React, { ChangeEvent } from 'react';
import Gap from '../../../../Components/Reusables/Gap';
import { Button, Checkbox, Image, Popover, Tooltip, Typography } from 'antd';
import Styles from './CardOrder.module.scss';
import { IMyOrder } from '../../Hook/useOrder';
import moment from 'moment';
import { EditOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import IMGLoading from '../../../../Assets/images/img-loading.gif';
import 'react-lazy-load-image-component/src/effects/blur.css';
import NumberFormat from 'react-number-format';

export interface ICardOrderProps {
  data: IMyOrder;
  onClick: (e: CheckboxChangeEvent) => void;
}

const { Text } = Typography;

export const CardOrder: React.FC<ICardOrderProps> = ({ data, onClick }) => {
  return (
    <div className={Styles['card-wrapper']}>
      <div className={Styles['card-img-wrapper']}>
        <LazyLoadImage
          key={data._id}
          alt={data._id}
          src={data.sample}
          height={250}
          width={300}
          effect="blur"
          placeholderSrc={IMGLoading}
        />
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

            <Tooltip title="Pilih Order">
              <Checkbox
                style={{
                  display:
                    data.payStatus === 'Sudah Terbayar' ? 'none' : 'block',
                }}
                onChange={(e) => onClick(e)}
                disabled={data.payStatus === 'Sudah Terbayar'}
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
            <Text className={Styles['card-body-text']}>Total</Text>
            <NumberFormat
              renderText={(value) => (
                <Text className={Styles['card-body-title']}>{value}</Text>
              )}
              displayType={'text'}
              thousandSeparator={'.'}
              decimalSeparator={','}
              prefix={'Rp. '}
              value={data.price || 0}
            />
          </div>
          <Gap height={16} />
        </div>

        {/* status-payment-pending */}
      </div>
    </div>
  );
};
