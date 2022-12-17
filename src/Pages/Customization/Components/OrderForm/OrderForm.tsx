import {
  Button,
  Col,
  DatePicker,
  Image,
  Input,
  Modal,
  Row,
  Tooltip,
  Typography,
} from "antd";
import { Field, FieldArray, FormikProps, FormikProvider } from "formik";
import moment from "moment";
import React, { useState } from "react";
import Gap from "../../../../Components/Reusables/Gap";
import Layout from "../../../../Components/Reusables/Layout";
import Navbar from "../../../../Components/Reusables/Navbar";
import Styles from "./OrderForm.module.scss";
import { IUseCustomization } from "../../Hooks/useCustomization";
import { DeleteTwoTone, SearchOutlined } from "@ant-design/icons";
import IMGDummy from "../../../../Assets/cloth/img-cloth-milano.png";
import { Cloths } from "../../../../Data/Constans/Customuzation";
import IMGSizeChart from "../../../../Assets/images/img-size-chart.jpg";

export interface IOrderFormProps {
  formik: FormikProps<IUseCustomization>;
  isLoading: boolean;
}

const { Title, Text } = Typography;

export const OrderForm: React.FC<IOrderFormProps> = ({ formik, isLoading }) => {
  const [clothActiveId, setClothActiveId] = useState(0);
  const [isShowModalSizeCart, setIsShowModalSizeCart] = useState(false);
  const isNotBackNumber = !formik.values.fontBackNumber;
  const isNotPlayerName = !formik.values.fontPlayerName;

  const onDisableDates = (currentDate: moment.Moment) => {
    const defaultDisableDate = 7;
    const players =
      formik.values.players.length < 12 ? 12 : formik.values.players.length;

    const disableDates = (players / 12) * defaultDisableDate;

    return (
      currentDate &&
      currentDate < moment().add(Math.floor(disableDates), "days")
    );
  };

  const onShowSizeCart = () => setIsShowModalSizeCart(true);
  const onCloseSizeCart = () => setIsShowModalSizeCart(false);

  return (
    <div className={Styles["container"]}>
      <Layout>
        <Row justify="center">
          <Col>
            <Title level={3} className={Styles["title-home"]}>
              FORM PEMESANAN
            </Title>
          </Col>
        </Row>

        <Row justify="center">
          <Col span={15}>
            <FormikProvider value={formik}>
              <form>
                <div>
                  <Text className={Styles["label-input"]}>Nama Pemesan</Text>
                  <Input
                    name="orderName"
                    value={formik.values.orderName}
                    onChange={formik.handleChange}
                    size="large"
                    placeholder="Ketik disini..."
                    className={Styles["input-text"]}
                  />
                </div>
                <Gap height={14} />

                <div>
                  <Text className={Styles["label-input"]}>Email Pemesan</Text>
                  <Input
                    name="orderEmail"
                    value={formik.values.orderEmail}
                    onChange={formik.handleChange}
                    size="large"
                    placeholder="Ketik disini..."
                    className={Styles["input-text"]}
                  />
                </div>
                <Gap height={14} />

                <div>
                  <Text className={Styles["label-input"]}>No Hp/WA</Text>
                  <Input
                    size="large"
                    name="orderPhone"
                    placeholder="Ketik disini..."
                    value={formik.values.orderPhone}
                    onChange={formik.handleChange}
                    className={Styles["input-text"]}
                  />
                </div>
                <Gap height={14} />
                <div>
                  <Text className={Styles["label-input"]}>Tanggal Ambil</Text>
                  <div>
                    <DatePicker
                      size="large"
                      value={moment(formik.values.pickUpDate)}
                      onChange={(value) =>
                        formik.setFieldValue(
                          "pickUpDate",
                          moment(value).format("YYYY-MM-DD")
                        )
                      }
                      format="DD MMMM YYYY"
                      className={Styles["input-text"]}
                      disabledDate={onDisableDates}
                      clearIcon={false}
                    />
                  </div>
                </div>
                <Gap height={14} />

                <div>
                  <Text className={Styles["label-input"]}>Jenis Kain</Text>

                  <Row gutter={[16, 16]}>
                    {Cloths.map((cloth) => (
                      <Col key={cloth.id} span={8}>
                        <div
                          className={
                            Styles[
                              `img-cloth-wrapper${
                                cloth.id === clothActiveId ? "-active" : ""
                              }`
                            ]
                          }
                          onClick={() => {
                            formik.setFieldValue("cloth", cloth.name);
                            setClothActiveId(cloth.id);
                          }}
                        >
                          <Image
                            width={200}
                            className={Styles["img-cloth"]}
                            src={cloth.image}
                            alt={cloth.image}
                          />
                        </div>
                        <Gap height={16} />
                        <Text className={Styles["text-description"]}>
                          {cloth.description}
                        </Text>
                      </Col>
                    ))}
                  </Row>
                </div>

                <div className={Styles["line-form"]} />

                <FieldArray
                  name="players"
                  render={(arrayHelpers) => (
                    <div>
                      <Row gutter={[16, 16]} align="bottom">
                        {formik.values.players.map((player, index) => (
                          <>
                            <Col span={14}>
                              <Text className={Styles["label-input"]}>
                                Nama Pemain
                              </Text>
                              <Input
                                disabled={isNotPlayerName}
                                size="large"
                                name={`players[${index}].name`}
                                placeholder="ex: Sarmili"
                                value={player.name}
                                onChange={formik.handleChange}
                                className={Styles["input-text"]}
                                autoComplete="off"
                              />
                            </Col>

                            <Col span={5}>
                              <Text className={Styles["label-input"]}>
                                Nomor Punggung
                              </Text>
                              <Input
                                disabled={isNotBackNumber}
                                size="large"
                                name={`players[${index}].backNumber`}
                                placeholder="ex: 10"
                                value={player.backNumber}
                                onChange={formik.handleChange}
                                className={Styles["input-text"]}
                                autoComplete="off"
                              />
                            </Col>

                            <Col span={3}>
                              <Text className={Styles["label-input"]}>
                                Ukuran
                              </Text>

                              <div
                                className=""
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Input
                                  size="large"
                                  name={`players[${index}].size`}
                                  placeholder="ex: S"
                                  value={player.size}
                                  onChange={formik.handleChange}
                                  className={Styles["input-text"]}
                                  autoComplete="off"
                                  style={{ marginRight: 8 }}
                                />

                                <Tooltip title="open size cart">
                                  <Button
                                    size="small"
                                    shape="circle"
                                    onClick={onShowSizeCart}
                                  >
                                    ?
                                  </Button>
                                </Tooltip>
                              </div>
                            </Col>

                            <Col>
                              <Button
                                danger
                                onClick={() => arrayHelpers.remove(index)}
                                icon={<DeleteTwoTone twoToneColor="#FF0000" />}
                                size="large"
                                className={Styles["btn-delete"]}
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
                            name: "",
                            backNumber: "",
                            size: "",
                          })
                        }
                        className={Styles["add-player"]}
                      >
                        <div className={Styles["line-form"]} />+ Tambah Pemain
                        <div className={Styles["line-form"]} />
                      </Button>
                    </div>
                  )}
                />

                <Gap height={16} />
                <Button
                  loading={isLoading}
                  size="large"
                  type="primary"
                  disabled={Object.keys(formik.errors).length > 0}
                  className={Styles["btn-order"]}
                  onClick={() => formik.handleSubmit()}
                >
                  Buat Pesanan
                </Button>
              </form>
            </FormikProvider>
          </Col>
        </Row>
      </Layout>

      {isShowModalSizeCart && (
        <Image
          width={200}
          src={IMGSizeChart}
          preview={{
            visible: isShowModalSizeCart,
            onVisibleChange: (visible, prevVisible) =>
              setIsShowModalSizeCart(visible),
          }}
        />
      )}
    </div>
  );
};
