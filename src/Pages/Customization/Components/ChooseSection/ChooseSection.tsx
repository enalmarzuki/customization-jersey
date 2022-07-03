import { Col, Row, Typography } from 'antd';
import React, { ChangeEvent, MouseEvent } from 'react';
import Styles from '../../Customization.module.scss';

interface IData {
  id: number;
  image: string;
}

export interface IChooseSectionProps {
  title: string;
  data: IData[];
  active: number;
  chosed: string;
  onChooseChange: (arg1: any, id: number, choose: string) => void;
}

const { Title } = Typography;

export const ChooseSection: React.FC<IChooseSectionProps> = ({
  title,
  data,
  active,
  chosed,
  onChooseChange,
}) => {
  return (
    <>
      <Title level={3} className={Styles['title-home']}>
        {title}
      </Title>

      <Row gutter={[24, 24]}>
        {data.map((item) => (
          <Col span={8} key={item.id}>
            <div
              className={
                Styles[`neck-wrapper${item.id === active ? '-is-active' : ''}`]
              }
              onClick={(e) => onChooseChange(e, item.id, chosed)}
            >
              <img src={item.image} alt={`img-kerah-${item.id}.png`} />
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};
