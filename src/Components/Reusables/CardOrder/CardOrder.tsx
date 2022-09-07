import { EditOutlined } from '@ant-design/icons';
import { Button, Checkbox, Tooltip, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import moment from 'moment';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import NumberFormat from 'react-number-format';
import IMGLoading from '../../../Assets/images/img-loading.gif';
import { IMyOrder } from '../../../Pages/Order/Hook/useOrder';
import Gap from '../Gap';
import Styles from './CardOrder.module.scss';

export interface ICardOrderProps {
  data: IMyOrder | any;
  isCheckout?: boolean;
  onClick: (e: CheckboxChangeEvent) => void;
  onShowModal: (id: string) => void;
}

const { Text } = Typography;

export const CardOrder: React.FC<ICardOrderProps> = ({
  data,
  onClick,
  onShowModal,
  isCheckout,
}) => {
  return (
    <div className={Styles['card-wrapper']}>
      <div className={Styles['card-img-wrapper']}>
        <LazyLoadImage
          key={data._id}
          alt={data._id}
          src={data.sample || data?.detailOrder[0]?.sample}
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
            <div className={Styles['card-body-text-wrapper']}>
              {isCheckout && (
                <>
                  <Text
                    className={`${Styles['status-payment']} ${
                      Styles[data.payStatus.toLowerCase().replace(' ', '-')]
                    }`}
                  >
                    {data.payStatus}
                  </Text>
                  <Gap height={20} />
                </>
              )}

              {!isCheckout && (
                <>
                  <Text className={Styles['card-body-text']}>Nama Pemesan</Text>
                  <Text className={Styles['card-body-title']}>
                    {data.orderName}
                  </Text>
                </>
              )}
            </div>

            {!isCheckout ? (
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
            ) : (
              <Button
                type="primary"
                icon={<EditOutlined />}
                ghost
                onClick={() => onShowModal(data._id)}
              />
            )}
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
          {!isCheckout && (
            <div className={Styles['card-body-text-wrapper']}>
              <Text className={Styles['card-body-text']}>Status</Text>
              <Text className={Styles['card-body-title']}>
                {data?.process || '-'}
              </Text>
            </div>
          )}
        </div>

        {/* status-payment-pending */}
      </div>
    </div>
  );
};
