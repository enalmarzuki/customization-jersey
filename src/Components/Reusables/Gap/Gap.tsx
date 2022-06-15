import React from 'react';

interface IGapProps {
  width?: number;
  height?: number;
}

const Gap: React.FC<IGapProps> = ({ width, height }) => {
  return <div style={{ width: width, height: height }} />;
};

export default Gap;
