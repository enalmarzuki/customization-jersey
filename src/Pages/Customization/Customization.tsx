import { DotChartOutlined } from '@ant-design/icons';
import { Button, Col, Row, Skeleton, Typography } from 'antd';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Gap from '../../Components/Reusables/Gap';
import Layout from '../../Components/Reusables/Layout';
import Navbar from '../../Components/Reusables/Navbar';
import API from '../../Config/axios';
import { IMotives } from '../Motive/Hooks/useMotive';
import { ChooseSection } from './Components/ChooseSection/ChooseSection';
import { OrderForm } from './Components/OrderForm/OrderForm';
import Styles from './Customization.module.scss';
import { useCustomization } from './Hooks/useCustomization';
import IMGLoading from '../../Assets/images/img-loading.gif';
import { Loading } from '../../Components/Reusables/Loading/Loading';
import {
  ArmJersey,
  FontsJersey,
  NecksJersey,
  NumberJersey,
} from '../../Data/Constans/Customuzation';

const { Title } = Typography;

export const SECTION_SELECTED = {
  Arm: 'ARM',
  Neck: 'NECK',
  Number: 'NUMBER',
  Font: 'FONT',
};

export const SECTION_NUMBER_JERSEY = {
  1: 'Liverpool Black',
  2: 'Persija Black',
  3: 'Barcalona Black',
  4: 'Barcalona White',
  5: 'Persija White',
  6: 'Liverpool White',
};

export const SECTION_PLAYER_JERSEY = {
  1: 'Liverpool Black',
  2: 'Persija Black',
  3: 'Barcalona Black',
  4: 'Liverpool White',
  5: 'Persija White',
  6: 'Barcalona White',
};

type ObjectKeyBackNumber = keyof typeof SECTION_NUMBER_JERSEY;
type ObjectKeyPlayerNumber = keyof typeof SECTION_NUMBER_JERSEY;

export interface IParams {
  idImg: string;
}

const Customization: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams<Partial<IParams>>();
  const selectMotive = params?.idImg?.substring(0, 2);

  const useCustomizationHooks = useCustomization();

  console.log('useCustomizationHooks >>', useCustomizationHooks.formik.errors);

  const [activeNeck, setActiveNeck] = useState(1);
  const [activeArm, setActiveArm] = useState(1);
  const [activeNumber, setActiveNumber] = useState(0);
  const [activeFont, setActiveFont] = useState(0);
  const [base64Jersey, setBase64Jersey] = useState<any>();
  const [isOrderForm, setIsOrderForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectedIdMotive = useMemo(
    () => `${selectMotive}${activeNeck}${activeArm}`,
    [selectMotive, activeNeck, activeArm]
  );

  const [selectedMotive, setSelectedMotive] = useState<IMotives>();

  const storeMotive = useSelector((state: any) => state.MotivePageStore);

  const { selectedObjects, editor, onReady } = useFabricJSEditor();
  const memoizedCanvasWidth = useMemo(
    () => editor?.canvas.width || 0,
    [editor]
  );
  const memoizedCanvasHeight = useMemo(
    () => editor?.canvas.height || 0,
    [editor]
  );

  useEffect(() => {
    setIsLoading(true);
    const artboard: any = editor?.canvas;
    API.get(`/motif/findByIdDesign/${selectedIdMotive}`)
      .then((res) => {
        setSelectedMotive(res.data?.dtMotif);
        fabric.Image.fromURL(
          res.data?.dtMotif.urlDesign || '',
          (img) => {
            artboard.set(`backgroundImage`, img);
            img.scaleToWidth(editor?.canvas.width || 0);
            img.scaleToHeight(editor?.canvas.height || 0);
            editor?.canvas.renderAll();
            onReady(artboard);
          },
          { crossOrigin: 'anonymous' }
        );
      })
      .catch((err) => err)
      .finally(() => setIsLoading(false));
  }, [selectedIdMotive]);

  const onCanvasReady = (canvas: any) => {
    fabric.Image.fromURL(
      selectedMotive?.urlDesign || '',
      (img) => {
        canvas.set(`backgroundImage`, img);
        img.scaleToWidth(canvas.width);
        img.scaleToHeight(canvas.height);
        canvas.renderAll();
        onReady(canvas);
      },
      { crossOrigin: 'anonymous' }
    );
  };

  const setImageToCanvas = (currentSrc: any) => {
    fabric.Image.fromURL(
      currentSrc,
      function (img) {
        let objs = editor?.canvas.getActiveObjects();

        const imgWidth = img.width || 0;
        const imgheight = img.height || 0;

        if (objs?.length) {
          objs.forEach(function (e: any) {
            if (e && e.type === 'image') {
              e.width = img.scaleToWidth(memoizedCanvasWidth / 7 || 100).width;
              e.height = img.scaleToHeight(
                memoizedCanvasHeight / 7 || 100
              ).height;
              e._element.src = currentSrc;
              editor?.canvas.renderAll();
            }
          });
        } else {
          if (
            imgWidth > memoizedCanvasWidth ||
            imgheight > memoizedCanvasHeight
          ) {
            img.scaleToWidth(memoizedCanvasWidth / 7 || 100);
            img.scaleToHeight(memoizedCanvasHeight / 7 || 100);
          }
          editor?.canvas.add(img);
          editor?.canvas.renderAll();
        }
      },
      { crossOrigin: 'anonymous' }
    );
  };

  const onUploadImage = (e: any) => {
    var url = URL.createObjectURL(e.target.files[0]);
    fabric.Image.fromURL(
      url,
      (img) => {
        const imgWidth = img.width || 0;
        const imgheight = img.height || 0;

        if (
          imgWidth > memoizedCanvasWidth ||
          imgheight > memoizedCanvasHeight
        ) {
          img.scaleToWidth(memoizedCanvasWidth / 2 || 100);
          img.scaleToHeight(memoizedCanvasHeight / 2 || 100);
        }

        editor?.canvas.add(img);
        editor?.canvas.renderAll();
      },
      { crossOrigin: 'anonymous' }
    );
  };

  const onChooseChange = (e: any, id: number, selected: string) => {
    const { currentSrc } = e.target;
    if (selected === SECTION_SELECTED.Neck) {
      setActiveNeck(id);
    } else if (selected === SECTION_SELECTED.Arm) {
      setActiveArm(id);
    } else if (selected === SECTION_SELECTED.Number) {
      setActiveNumber(id);
      useCustomizationHooks.formik.setFieldValue(
        'fontPlayerName',
        SECTION_NUMBER_JERSEY[id as ObjectKeyBackNumber]
      );
      return setImageToCanvas(currentSrc);
    } else {
      setActiveFont(id);
      useCustomizationHooks.formik.setFieldValue(
        'fontBackNumber',
        SECTION_NUMBER_JERSEY[id as ObjectKeyPlayerNumber]
      );
      return setImageToCanvas(currentSrc);
    }
  };

  const onDeleteComponent = () => {
    editor?.canvas.getActiveObjects().forEach((obj) => {
      editor?.canvas.remove(obj);
    });
  };

  const urltoFile = (url: any, filename: any, mimeType: any) => {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  };

  const onClickNext = async () => {
    const base64 = editor?.canvas?.toDataURL({
      quality: 0.5,
    });
    const tempFile = await urltoFile(base64, 'resultbaju.png', 'image/png');

    setBase64Jersey(
      editor?.canvas?.toDataURL({
        quality: 0.5,
      })
    );

    useCustomizationHooks.formik.setFieldValue('motive', selectedIdMotive);
    useCustomizationHooks.formik.setFieldValue('image', tempFile);
    setIsOrderForm(true);
  };

  useEffect(() => {
    const objectSelected = editor?.canvas.getActiveObject();
    objectSelected?.bringToFront();
  }, [editor]);

  if (!selectedMotive) {
    return <Skeleton.Image />;
  }

  return (
    <div className={Styles['container']}>
      <Navbar isActive={'Home'} />

      {isLoading && <Loading />}

      {!isOrderForm ? (
        <Layout>
          <Row>
            <Col span={14}>
              <div className={Styles['canvas-wrapper']}>
                <FabricJSCanvas
                  className={Styles['canvas-preview']}
                  onReady={onCanvasReady}
                />
              </div>
            </Col>
            <Col className={Styles['right-content']} span={9} offset={1}>
              <div>
                <Title level={3} className={Styles['title-home']}>
                  Masukkan Gambar
                </Title>
                <div className={Styles['config-img-wrapper']}>
                  <input
                    name={`text`}
                    type="file"
                    accept="image/*"
                    onChange={onUploadImage}
                  />
                  <Button danger onClick={onDeleteComponent}>
                    Hapus Komponen
                  </Button>
                </div>
              </div>
              <Gap height={24} />

              {/* Choose Neck */}
              <ChooseSection
                title="Pilih Kerah Jersey"
                active={activeNeck}
                chosed={SECTION_SELECTED.Neck}
                data={NecksJersey}
                onChooseChange={onChooseChange}
              />

              <Gap height={32} />

              {/* Choose Arm */}
              <ChooseSection
                title="Pilih Lengan"
                active={activeArm}
                chosed={SECTION_SELECTED.Arm}
                data={ArmJersey}
                onChooseChange={onChooseChange}
              />

              <Gap height={32} />

              {/* Choose Number */}
              <ChooseSection
                title="Pilih Tipe Nomor Punggung"
                active={activeNumber}
                chosed={SECTION_SELECTED.Number}
                data={NumberJersey}
                onChooseChange={onChooseChange}
              />

              <Gap height={32} />

              {/* Choose Font */}
              <ChooseSection
                title="Pilih Tipe Tulisan"
                active={activeFont}
                chosed={SECTION_SELECTED.Font}
                data={FontsJersey}
                onChooseChange={onChooseChange}
              />

              <Gap height={32} />

              <div style={{ background: 'white', paddingTop: 16 }}>
                <Button
                  onClick={onClickNext}
                  style={{ width: '100%' }}
                  size="large"
                  type="primary"
                >
                  Selanjutnya
                </Button>
              </div>
            </Col>
          </Row>
        </Layout>
      ) : (
        <OrderForm
          formik={useCustomizationHooks.formik}
          isLoading={useCustomizationHooks.isLoading}
        />
      )}
    </div>
  );
};

export default Customization;
