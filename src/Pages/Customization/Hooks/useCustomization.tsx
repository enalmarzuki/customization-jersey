import { message } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PostOrder } from "../../../API/PostOrder";
import API from "../../../Config/axios";
import useLocalStorage from "../../../Utils/Hooks/useLocalStorage/useLocalStorage";
import CustomizationSchema from "./useCustomization.validator";

export interface IPlayer {
  name: string;
  backNumber: string;
  size: string;
}

export interface IUseCustomization {
  idClient: string;
  orderName: string;
  orderEmail: string;
  orderPhone: string;
  pickUpDate: string;
  fontPlayerName: string;
  fontBackNumber: string;
  cloth: string;
  motive: string;
  players: IPlayer[];
  image: any;
  price: number;
}

export const useCustomization = () => {
  const [user] = useLocalStorage({ key: "user", defaultValue: "" });

  const INTIAL_VALUE_FORMIK = {
    idClient: user.id,
    orderName: user.name,
    orderEmail: user.email,
    orderPhone: user.phone,
    pickUpDate: moment().add(8, "days").format("YYYY-MM-DD"),
    fontPlayerName: "",
    fontBackNumber: "",
    cloth: "",
    motive: "",
    players: [
      {
        name: "",
        backNumber: "",
        size: "",
      },
    ],
    image: "",
    price: 0,
  };

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const resetFormik = async () => {
    await formik.setValues(INTIAL_VALUE_FORMIK);
  };

  const formik = useFormik<IUseCustomization>({
    initialValues: INTIAL_VALUE_FORMIK,
    validationSchema: CustomizationSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      console.log("values >>", values);

      const tempData = { ...values };
      const fixPrice = 50000 * tempData.players.length;
      tempData.price = fixPrice;

      setIsLoading(true);
      PostOrder(tempData)
        .then(() => {
          message.success("Berhasil Membuat Pesanan");
          navigate("/motive");
        })
        .catch((err) => console.log("err", err))
        .finally(() => setIsLoading(false));
    },
    onReset: resetFormik,
  });

  useEffect(() => {
    formik.setFieldValue("idClient", user.id);
  }, [user]);

  return {
    formik,
    isLoading,
  };
};
