
import styles from "../styles/Home.module.css";
import Camera from "./Camera";
import { useContinuousPredict } from "../hooks";
import { useState } from "react";

const ContinousPredict = () => {
    const predictRetryTimes = 1;
    const [continuousPredictUUID, setContinuousPredictUUID] = useState(null);
    const [continuousPredictGUID, setContinuousPredictGUID] = useState(null);
    const continuousPredictSuccess = (UUID, GUID) => {
      setContinuousPredictUUID(UUID);
      setContinuousPredictGUID(GUID);
    };
    const continuousOnNotFoundAndFailure = () => {
      setContinuousPredictUUID(null);
      setContinuousPredictGUID(null);
    };
    const {
        faceDetected: continuousFaceDetected,
        predictUser: continuousPredictUser,
        continuousPredictMessage,
      } = useContinuousPredict(
        "userVideo",
        continuousPredictSuccess,
        continuousOnNotFoundAndFailure,
        continuousOnNotFoundAndFailure,
        predictRetryTimes
      );

    const handleContinuousPredict = async () => {
        continuousPredictUser();
      };
  return (
    <div id="canvasInput" className={styles.container}>
      <Camera>
      {continuousPredictMessage && (
            <div>
              <div>{`Face Valid: ${
                continuousFaceDetected ? "Face Detected" : "Face not detected"
              }`}</div>
              <div>{`Message: ${continuousPredictMessage}`}</div>
              <div>{`Predicted GUID: ${
                continuousPredictGUID ? continuousPredictGUID : ""
              }`}</div>
              <div>{`Predicted UUID: ${
                continuousPredictUUID ? continuousPredictUUID : ""
              }`}</div>
            </div>
          )}
        </Camera>
        

      <div id="module_functions" className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleContinuousPredict}>
          Continous Predict
        </button>
      </div>
    </div>
  );
};

export default ContinousPredict;
