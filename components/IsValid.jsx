
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Camera from "./Camera";
import { useIsValid } from "../hooks";

const IsValid = () => {
    const [currentAction, setCurrentAction] = useState(null);
    const {
        faceDetected: isValidFaceDetected,
        isValidCall,
        hasFinished,
        setHasFinished,
      } = useIsValid("userVideo");
      // isValid
      const handleIsValid = async () => {
        setCurrentAction("isValid");
        await isValidCall();
      };
    
      // to start and stop isValid call when on loop
      useEffect(() => {
        const doIsValid = async () => {
          await isValidCall();
        };
    
        if (currentAction === "isValid" && hasFinished) {
          setHasFinished(false);
        }
        if (currentAction === "isValid" && !hasFinished) {
          doIsValid();
        }
        if (currentAction !== "isValid" && hasFinished) {
          setHasFinished(false);
        }
      }, [currentAction, hasFinished]);
  return (
    <div id="canvasInput" className={styles.container}>
      <Camera>
        {currentAction === 'isValid' && <div>
          <div>{`Face Valid: ${isValidFaceDetected}`}</div>
        </div>}
        </Camera>
        

      <div id="module_functions" className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleIsValid}>
          Is Valid
        </button>
      </div>
    </div>
  );
};

export default IsValid;
