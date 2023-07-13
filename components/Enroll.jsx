
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Camera from "./Camera";
import { useEnrollOneFa } from "../hooks";

const Enroll = () => {
    const [deviceId, setDeviceId] = useState('')
  const {
    faceDetected: enrollOneFaFaceDetected,
    enrollStatus: enrollOneFaStatus,
    enrollData: enrollOneFaData,
    enrollUserOneFa,
    progress: enrollOneFaProgress,
  } = useEnrollOneFa();
  const handleEnrollOneFa = async () => {
    enrollUserOneFa();
  };
  return (
    <div id="canvasInput" className={styles.container}>
      <Camera getDeviceId={e => setDeviceId(e)}>
      {enrollOneFaProgress > 0 && <div>
              <div>
                Enroll Face Detected:
                {enrollOneFaFaceDetected ? "Face Detected" : "No Face Detected"}
              </div>
              <div> Enroll Status: {enrollOneFaStatus} </div>
              <div> Progress: {`${enrollOneFaProgress} %`}</div>
              <div>
                Enroll GUID:&nbsp;
                {`${enrollOneFaData ? enrollOneFaData.PI.guid : ""}`}
              </div>
              <div>
                Enroll UUID:&nbsp;
                {`${enrollOneFaData ? enrollOneFaData.PI.uuid : ""}`}
              </div>
            </div>
          }
        </Camera>
        

      <div id="module_functions" className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleEnrollOneFa}>
          Enroll
        </button>
      </div>
    </div>
  );
};

export default Enroll;
