import { Col, Row, Skeleton, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Gap from "../../Components/Reusables/Gap";
import Layout from "../../Components/Reusables/Layout";
import Navbar from "../../Components/Reusables/Navbar";
import { ProductRecommendations } from "../../Data/Dummy/Constans/Home";
import { SET_MOTIVE } from "../../Store/type";
import { useMotive } from "./Hooks/useMotive";
import Styles from "./Motive.module.scss";
import { MotiveSkeleton } from "./MotiveSkeleton";
import NumberFormat from "react-number-format";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import IMGLoading from "../../Assets/images/img-loading.gif";
import { url } from "inspector";
import { ButtonWhatsapp } from "../../Components/Reusables/ButtonWhatsapp/ButtonWhatsapp";

const { Title, Text } = Typography;

const skeletonSize = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const LoadingComponent: React.FC = () => {
  return (
    <div style={{ width: 320, height: 250, backgroundColor: "gray" }}>
      Loading...
    </div>
  );
};

const Motive: React.FC = () => {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const { motives, isLoading } = useMotive();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickMotive = (imgUrl: string, idImg: string) => {
    dispatch({ type: SET_MOTIVE, value: imgUrl });
    navigate(`/customization/${idImg}`);
  };

  return (
    <div className={Styles["container"]}>
      <Navbar isActive={"Home"} />

      <Layout>
        {isLoading ? (
          <>
            <Row gutter={[24, 24]}>
              {skeletonSize.map((_, index) => (
                <Col span={8} key={index}>
                  <MotiveSkeleton />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <>
            <Title level={3} className={Styles["title-home"]}>
              Pilih Motif
            </Title>
            <Row gutter={[24, 24]}>
              {motives?.map((motive) => (
                <Col span={8} key={motive.idDesign}>
                  <div
                    className={Styles["card-rekomendasi"]}
                    onClick={() =>
                      onClickMotive(motive.urlDesign, motive.idDesign)
                    }
                  >
                    <LazyLoadImage
                      wrapperClassName="card-lazy-wrapper"
                      key={motive.idDesign}
                      className={Styles["card-rekomendasi-img"]}
                      alt={motive.idDesign}
                      src={motive.urlDesign}
                      height={290}
                      effect="blur"
                      placeholderSrc={IMGLoading}
                    />

                    <Gap height={16} />
                    <div className={Styles["title-wrapper"]}>
                      <Text className={Styles["title-motive"]}>
                        Code : {motive.idDesign}
                      </Text>
                      <NumberFormat
                        renderText={(value) => (
                          <Text className={Styles["title-motive"]}>
                            {value}
                          </Text>
                        )}
                        displayType={"text"}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        prefix={"Rp. "}
                        value={motive.price || 0}
                      />
                    </div>
                    <p></p>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Layout>
    </div>
  );
};

export default Motive;
