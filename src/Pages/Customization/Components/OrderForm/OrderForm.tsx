import { Button, Col, DatePicker, Input, Row, Typography } from 'antd';
import { Field, FieldArray, FormikProps, FormikProvider } from 'formik';
import moment from 'moment';
import React from 'react';
import Gap from '../../../../Components/Reusables/Gap';
import Layout from '../../../../Components/Reusables/Layout';
import Navbar from '../../../../Components/Reusables/Navbar';
import Styles from './OrderForm.module.scss';
import { IUseCustomization } from '../../Hooks/useCustomization';
import { DeleteTwoTone } from '@ant-design/icons';

export interface IOrderFormProps {
  formik: FormikProps<IUseCustomization>;
}

const { Title, Text } = Typography;

export const OrderForm: React.FC<IOrderFormProps> = ({ formik }) => {
  return (
    <div className={Styles['container']}>
      <Layout>
        <Row justify="center">
          <Col>
            <Title level={3} className={Styles['title-home']}>
              FORM PEMESANAN
            </Title>
          </Col>
        </Row>

        <Row justify="center">
          <Col span={15}>
            <FormikProvider value={formik}>
              <form>
                <div>
                  <Text className={Styles['label-input']}>Nama Pemesan</Text>
                  <Input
                    name="customerName"
                    value={formik.values.customerName}
                    onChange={formik.handleChange}
                    size="large"
                    placeholder="Ketik disini..."
                    className={Styles['input-text']}
                  />
                </div>
                <Gap height={14} />
                <div>
                  <Text className={Styles['label-input']}>No Hp/WA</Text>
                  <Input
                    size="large"
                    name="phoneNumber"
                    placeholder="Ketik disini..."
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    className={Styles['input-text']}
                  />
                </div>
                <Gap height={14} />
                <div>
                  <Text className={Styles['label-input']}>Tanggal Ambil</Text>
                  <div>
                    <DatePicker
                      size="large"
                      value={moment(formik.values.pickUpDate)}
                      onChange={(value) =>
                        formik.setFieldValue(
                          'pickUpDate',
                          moment(value).format('YYYY-MM-DD')
                        )
                      }
                      format="DD MMMM YYYY"
                      className={Styles['input-text']}
                    />
                  </div>
                </div>
                <Gap height={14} />

                <div className={Styles['line-form']} />

                <FieldArray
                  name="players"
                  render={(arrayHelpers) => (
                    <div>
                      <Row gutter={[16, 16]} align="bottom">
                        {formik.values.players.map((player, index) => (
                          <>
                            <Col span={14}>
                              <Text className={Styles['label-input']}>
                                Nama Pemain
                              </Text>
                              <Input
                                size="large"
                                name={`players[${index}].name`}
                                placeholder="ex: Sarmili"
                                value={player.name}
                                onChange={formik.handleChange}
                                className={Styles['input-text']}
                              />
                            </Col>

                            <Col span={5}>
                              <Text className={Styles['label-input']}>
                                Nomor Punggung
                              </Text>
                              <Input
                                size="large"
                                name={`players[${index}].number`}
                                placeholder="ex: 10"
                                value={player.number}
                                onChange={formik.handleChange}
                                className={Styles['input-text']}
                              />
                            </Col>

                            <Col span={3}>
                              <Text className={Styles['label-input']}>
                                Ukuran
                              </Text>
                              <Input
                                size="large"
                                name={`players[${index}].size`}
                                placeholder="ex: S"
                                value={player.size}
                                onChange={formik.handleChange}
                                className={Styles['input-text']}
                              />
                            </Col>

                            <Col>
                              <Button
                                danger
                                onClick={() => arrayHelpers.remove(index)}
                                icon={<DeleteTwoTone twoToneColor="#FF0000" />}
                                size="large"
                                className={Styles['btn-delete']}
                              />
                            </Col>
                          </>
                        ))}
                      </Row>
                      <Gap height={12} />
                      <Button
                        size="large"
                        type="link"
                        onClick={() =>
                          arrayHelpers.push({
                            name: '',
                            number: '',
                            size: '',
                          })
                        }
                        className={Styles['add-player']}
                      >
                        <div className={Styles['line-form']} />+ Tambah Pemain
                        <div className={Styles['line-form']} />
                      </Button>
                    </div>
                  )}
                />

                <Gap height={16} />
                <Button
                  size="large"
                  type="primary"
                  disabled={Object.keys(formik.errors).length > 0}
                  className={Styles['btn-order']}
                  onClick={() => formik.handleSubmit()}
                >
                  Buat Pesanan
                </Button>
              </form>
            </FormikProvider>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};
