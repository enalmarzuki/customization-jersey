import { Skeleton } from 'antd';
import React from 'react';
import Gap from '../../Components/Reusables/Gap';

export const MotiveSkeleton = () => {
  return (
    <>
      <Skeleton.Avatar active shape="square" size={385} />
      <Gap height={24} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton.Input active={true} />
        <Skeleton.Input active={true} />
      </div>
    </>
  );
};
