import { Button, Col, Row, Typography, Upload, message } from 'antd';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../Components/Reusables/Layout';
import Navbar from '../../Components/Reusables/Navbar';
import {
  ArmJersey,
  NecksJersey,
} from '../../Data/Dummy/Constans/Customuzation';
import Styles from './Customization.module.scss';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import Gap from '../../Components/Reusables/Gap';

const { Title } = Typography;

const Customization: React.FC = () => {
  const [text, setText] = useState('');
  const [active, setActive] = useState(0);

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

  const onUploadImage = (e: any) => {
    console.log('e.target.files[0]', e.target.files[0]);
    var url = URL.createObjectURL(e.target.files[0]);
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

  const onChooseNeck = (e: any, id: number) => {
    const { currentSrc } = e.target;
    setActive(id);

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

  const onDeleteComponent = () => {
    editor?.canvas.getActiveObjects().forEach((obj) => {
      editor?.canvas.remove(obj);
    });
  };

  useEffect(() => {
    const objectSelected = editor?.canvas.getActiveObject();
    objectSelected?.bringToFront();
  }, [editor]);

  return (
    <div className={Styles['container']}>
      <Navbar isActive={'Home'} />
      <Layout>
        <Row>
          <Col span={9}>
            <div className={Styles['canvas-wrapper']}>
              <FabricJSCanvas
                className={Styles['canvas-preview']}
                onReady={onCanvasReady}
              />

              <Title level={5}>Masukkan Gambar</Title>
              <input
                name={`text`}
                type="file"
                accept="image/*"
                onChange={onUploadImage}
              />
            </div>
          </Col>
          <Col span={12} offset={3}>
            <Title level={3} className={Styles['title-home']}>
              Pilih Kerah Jersey
            </Title>

            <Row gutter={[24, 24]}>
              {NecksJersey.map((neck) => (
                <Col span={8} key={neck.id}>
                  <div
                    className={
                      Styles[
                        `neck-wrapper${neck.id === active ? '-is-active' : ''}`
                      ]
                    }
                    onClick={(e) => onChooseNeck(e, neck.id)}
                  >
                    <img src={neck.image} alt={`img-kerah-${neck.id}.png`} />
                  </div>
                </Col>
              ))}
            </Row>

            <Gap height={32} />

            <Title level={3} className={Styles['title-home']}>
              Pilih Lengan
            </Title>

            <Row gutter={[24, 24]}>
              {ArmJersey.map((neck) => (
                <Col span={8} key={neck.id}>
                  <div
                    className={
                      Styles[
                        `neck-wrapper${neck.id === active ? '-is-active' : ''}`
                      ]
                    }
                    onClick={(e) => onChooseNeck(e, neck.id)}
                  >
                    <img src={neck.image} alt={`img-kerah-${neck.id}.png`} />
                  </div>
                </Col>
              ))}
            </Row>
            <Button type="primary" onClick={onDeleteComponent}>
              Hapus Komponen
            </Button>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default Customization;
