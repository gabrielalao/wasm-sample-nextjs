
import styles from "../styles/Home.module.css";
import Camera from "./Camera";
import { usePredictOneFa } from "../hooks";

const Predict = () => {
    const handlePredictSuccess = (result) => {
        console.log("======PREDICT SUCCESS========");
      };
      const {
        predictOneFaData,
        predictOneFaaceDetected,
        predictMessage,
        predictUserOneFa,
      } = usePredictOneFa("userVideo", handlePredictSuccess);
      const handlePredictOneFa = async () => {
        predictUserOneFa();
      };
  return (
    <div id="canvasInput" className={styles.container}>
      <Camera>
      {predictMessage && (
            <div>
              <div>{`Face Valid: ${
                predictOneFaaceDetected ? "Face Detected" : "Face not detected"
              }`}</div>
              <div>{`Message: ${predictMessage}`}</div>
              <div>{`Predicted GUID: ${
                predictOneFaData ? predictOneFaData.PI.guid : ""
              }`}</div>
              <div>{`Predicted UUID: ${
                predictOneFaData ? predictOneFaData.PI.uuid : ""
              }`}</div>
            </div>
          )}
        </Camera>


      <div id="module_functions" className={styles.buttonContainer}>
        <button className={styles.button} onClick={handlePredictOneFa}>
          Predict
        </button>
      </div>
    </div>
  );
};

export default Predict;
