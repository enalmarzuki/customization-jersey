import React from 'react';
import Styles from './Loading.module.scss';
import IMGLoading from '../../../Assets/images/img-loading.gif';

export const Loading = () => {
  return (
    <div className={Styles['is-loading']}>
      <img src={IMGLoading} alt="img-loading.gif" />
    </div>
  );
};
