'use client';

import MethodSelector from '@/src/components/inputs/MethodSelector/MethodSelector';
import styles from './rest.module.scss';
import { useState } from 'react';

export default function Rest() {
  const [method, setMethod] = useState('GET');

  const handleMethodChange = (newMethod: string) => {
    setMethod(newMethod);
    console.log('method changed');
  };

  return (
    <main className="main">
      <h2 className={styles.restHead}>RESTfull Client</h2>
      <MethodSelector selectedMethod={method} onMethodChange={handleMethodChange} />
    </main>
  );
}
