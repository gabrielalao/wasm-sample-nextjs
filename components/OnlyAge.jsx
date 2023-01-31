
import usePredictAge from "../hooks/usePredictAge";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Camera from "./Camera";

const OnlyAge = () => {
  const { doPredictAge, age, predictAgeHasFinished, setPredictAgeHasFinished } =
    usePredictAge();
  const [predictAge, setPredictAge] = useState(false);

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
      <Camera>
        {age > 0 && (
          <div className={styles["age-box"]}>
            <div>{Math.round(age)}</div>
          </div>
        )}
        </Camera>


      <div id="module_functions" className={styles.buttonContainer}>
        <button className={styles.button} onClick={handlePredictAge}>
          Predict Age
        </button>
      </div>
    </div>
  );
};

export default OnlyAge;
