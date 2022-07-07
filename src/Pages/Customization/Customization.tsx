import { Button, Col, Row, Typography } from 'antd';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Gap from '../../Components/Reusables/Gap';
import Layout from '../../Components/Reusables/Layout';
import Navbar from '../../Components/Reusables/Navbar';
import {
  ArmJersey,
  FontsJersey,
  NecksJersey,
  NumberJersey,
} from '../../Data/Dummy/Constans/Customuzation';
import { ChooseSection } from './Components/ChooseSection/ChooseSection';
import { OrderForm } from './Components/OrderForm/OrderForm';
import Styles from './Customization.module.scss';
import { useCustomization } from './Hooks/useCustomization';

const { Title } = Typography;

export const SECTION_SELECTED = {
  Arm: 'ARM',
  Neck: 'NECK',
  Number: 'NUMBER',
  Font: 'FONT',
};

const Customization: React.FC = () => {
  const navigate = useNavigate();
  const useCustomizationHooks = useCustomization();

  const [activeNeck, setActiveNeck] = useState(0);
  const [activeArm, setActiveArm] = useState(0);
  const [activeNumber, setActiveNumber] = useState(0);
  const [activeFont, setActiveFont] = useState(0);
  const [base64Jersey, setBase64Jersey] = useState<any>();
  const [isOrderForm, setIsOrderForm] = useState(false);

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

  console.log('selectedObjects >>', selectedObjects);

  const onCanvasReady = (canvas: any) => {
    fabric.Image.fromURL(
      `http://localhost:3000${storeMotive.selectedMotive}`,
      (img) => {
        canvas.set(`backgroundImage`, img);
        img.scaleToWidth(canvas.width);
        img.scaleToHeight(canvas.height);
        canvas.renderAll();
        onReady(canvas);
      }
    );
  };

  const setImageToCanvas = (currentSrc: any) => {
    fabric.Image.fromURL(currentSrc, function (img) {
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
    });
  };

  const onUploadImage = (e: any) => {
    console.log('e.target.files[0]', e.target.files);
    var url = URL.createObjectURL(e.target.files[0]);
    console.log('url', url);
    fabric.Image.fromURL(url, (img) => {
      console.log('img >>', img);
      const imgWidth = img.width || 0;
      const imgheight = img.height || 0;

      if (imgWidth > memoizedCanvasWidth || imgheight > memoizedCanvasHeight) {
        img.scaleToWidth(memoizedCanvasWidth / 2 || 100);
        img.scaleToHeight(memoizedCanvasHeight / 2 || 100);
      }

      editor?.canvas.add(img);
      editor?.canvas.renderAll();
    });
  };

  const onChooseChange = (e: any, id: number, selected: string) => {
    const { currentSrc } = e.target;
    console.log('currentSrc >>', currentSrc);
    if (selected === SECTION_SELECTED.Neck) {
      setActiveNeck(id);
    } else if (selected === SECTION_SELECTED.Arm) {
      setActiveArm(id);
    } else if (selected === SECTION_SELECTED.Number) {
      setActiveNumber(id);
    } else {
      setActiveFont(id);
    }
    return setImageToCanvas(currentSrc);
  };

  const onDeleteComponent = () => {
    editor?.canvas.getActiveObjects().forEach((obj) => {
      editor?.canvas.remove(obj);
    });
  };

  const onClickNext = async () => {
    setBase64Jersey(
      editor?.canvas.toDataURL({
        format: 'png',
        quality: 0.8,
      })
    );

    const tes = JSON.stringify(editor?.canvas.toJSON());
    const file = new File([tes], 'foo.txt', {
      type: 'text/plain',
    });

    // new File([tes], "resultbaju", { lastModified: new Date().getTime(), type: 'image/png' })

    // let blob = new File([tes], { type: 'image/png' });
    let blob = new File([tes], 'resultbaju', {
      lastModified: new Date().getTime(),
      type: 'image/png',
    });

    const dataUrl = window.URL.createObjectURL(blob);

    console.log('dataUrl >>', dataUrl);
    console.log('blob >>', blob);

    setIsOrderForm(true);
  };

  useEffect(() => {
    const objectSelected = editor?.canvas.getActiveObject();
    objectSelected?.bringToFront();
  }, [editor]);

  return (
    <div className={Styles['container']}>
      <Navbar isActive={'Home'} />
      {!isOrderForm ? (
        <Layout>
          <Row>
            <Col span={9}>
              <div className={Styles['canvas-wrapper']}>
                <FabricJSCanvas
                  className={Styles['canvas-preview']}
                  onReady={onCanvasReady}
                />
              </div>
            </Col>
            <Col className={Styles['right-content']} span={12} offset={3}>
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

            <Col>
              <img src={base64Jersey} alt="asdasd" />
            </Col>
          </Row>
        </Layout>
      ) : (
        <OrderForm formik={useCustomizationHooks.formik} />
      )}
    </div>
  );
};

export default Customization;
