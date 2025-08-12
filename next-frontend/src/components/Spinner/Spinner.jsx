'use client';

import React from 'react';
import './Spinner.module.css';

const Spinner = ({ strInfo = 'данные' }) => {
  return (
    <div className={styles.spinnerContainer} role="status" aria-live="polite">
      <div className={styles.spinner} />
      <span>Загружаем {strInfo}...</span>
    </div>
  );
};

export default Spinner;
