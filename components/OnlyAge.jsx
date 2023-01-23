import { useCamera, useWasm } from "../hooks";
import { isAndroid, isIOS, osVersion } from "../utils";

import usePredictAge from "../hooks/usePredictAge";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const OnlyAge = () => {
  const { ready: wasmReady } = useWasm();

  const { ready, init } = useCamera("userVideo");
  const { doPredictAge, age, predictAgeHasFinished, setPredictAgeHasFinished } =
    usePredictAge();
  const [predictAge, setPredictAge] = useState(false);

  useEffect(() => {
    if (!wasmReady) return;
    if (!ready) init();
    if (isIOS && osVersion < 15) {
      console.log("Does not support old version of iOS os version 15 below.");
    } else if (isAndroid && osVersion < 11) {
      console.log(
        "Does not support old version of Android os version 11 below."
      );
    }
    console.log("--- wasm status ", wasmReady, ready);
  }, [wasmReady, ready]);

  useEffect(() => {
    if (predictAge && !predictAgeHasFinished) {
      doPredictAge();
    } else {
      setPredictAgeHasFinished(false);
    }
  }, [predictAgeHasFinished]);

  const handlePredictAge = () => {
    setPredictAge(true);
    doPredictAge();
  };
  return (
    <div id="canvasInput" className={styles.container}>
      <div className={styles.cameraContainer}>
        <video
          id="userVideo"
          className={`
              ${styles.cameraDisplay} 
              ${styles.mirrored}
            `}
          muted
          autoPlay
          playsInline
        />
        {age > 0 && (
          <div className={styles["age-box"]}>
            <div>{Math.round(age)}</div>
          </div>
        )}
      </div>
      <div id="module_functions" className={styles.buttonContainer}>
        <button className={styles.button} onClick={handlePredictAge}>
          Predict Age
        </button>
      </div>
    </div>
  );
};

export default OnlyAge;
