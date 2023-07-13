import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Camera from "./Camera";
import { useIsValid } from "../hooks";

const IsValid = () => {
  const { faceDetected: isValidFaceDetected, isValidCall } =
    useIsValid("userVideo");

  const [start, setStart] = useState(false);

  const handleIsValid = async () => {
    setStart(true);
    await isValidCall();
  };
  const handleIsValidLoop = async () => {
    setStart(true);
    await isValidCall(true);
  };

  return (
    <div id="canvasInput" className={styles.container}>
      <Camera>
        {start && (
          <div>
            <div>{`Face Valid: ${isValidFaceDetected}`}</div>
          </div>
        )}
      </Camera>

      <div id="module_functions" className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleIsValid}>
          Is Valid
        </button>
        <button className={styles.button} onClick={handleIsValidLoop}>
          Is Valid on Loop
        </button>
      </div>
    </div>
  );
};

export default IsValid;
