import { Col, Row } from 'antd';
import React, { useState } from 'react';
import Layout from '../../Components/Reusables/Layout';
import Navbar from '../../Components/Reusables/Navbar';
import Styles from './Customization.module.scss';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import DummyBGCanvas from '../../Data/Dummy/img-canvas.png';
import { useSelector } from 'react-redux';

const Customization: React.FC = () => {
  const [text, setText] = useState('');
  const { selectedObjects, editor, onReady } = useFabricJSEditor();
  const storeMotive = useSelector((state: any) => state.MotivePageStore);

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

  const onAddText = () => {
    editor?.addText(text);
    setText('');
  };

  return (
    <div className={Styles['container']}>
      <Navbar isActive={'Home'} />
      <Layout>
        <Row>
          <Col span={8}>
            <fieldset>
              <input
                name={`text`}
                type={`text`}
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
              <button onClick={onAddText}>Add Text</button>
            </fieldset>
            <div className={Styles['canvas-wrapper']}>
              <FabricJSCanvas
                className={Styles['canvas-preview']}
                onReady={onCanvasReady}
              />
            </div>
          </Col>
          <Col span={12} offset={4}>
            <p>custom here...</p>
            {/* <img src={DummyBGCanvas} /> */}
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default Customization;
