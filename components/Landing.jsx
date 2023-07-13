import React from 'react';
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/router';

const Landing = () => {
    const {push} = useRouter();
    return (
    <div id="module_functions" className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => push('is-valid')}>
            Is Valid
          </button>
          <button className={styles.button} onClick={() => push('predict-age')}>
            Predict Age
          </button>
          <button className={styles.button} onClick={() => push('enroll')}>
            Enroll
          </button>
          <button className={styles.button} onClick={() => push('predict')}>
            Predict
          </button>
          <button className={styles.button} onClick={() => push('continous-predict')}>
            Continuous Predict
          </button>
          <button className={styles.button} onClick={() => push('delete')}>
            Delete
          </button>
          {/* <button className={styles.button} onClick={() => push('scan-front-document')}>
            Scan Front Document
          </button> */}
          <button className={styles.button} onClick={() => push('scan-validity')}>
            Scan Front Document
          </button>
          <button className={styles.button} onClick={() => push('scan-back-document')}>
            Scan Back Document
          </button>
          <button className={styles.button} onClick={() => push('find-iso')}>
            Face ISO
          </button>
        </div>
)};

export default Landing;
