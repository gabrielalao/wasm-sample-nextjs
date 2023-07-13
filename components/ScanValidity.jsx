
import styles from "../styles/Home.module.css";
import Camera from "./Camera";
import { useScanFrontDocumentWithoutPredict } from "../hooks";
import { useState } from "react";


const ScanValidity = () => {
  const [currentAction, setCurrentAction] = useState('');
      const { isFound: isfoundValidity, scanFrontDocument: scanFrontValidity } =
      useScanFrontDocumentWithoutPredict();
    const handleFrontDLValidity = async () => {
      setCurrentAction("useScanDocumentFrontValidity");
      await scanFrontValidity();
    };

  return (
    <div id="canvasInput" className={styles.container}>
      <Camera currentAction={"useScanDocumentFrontValidity"}>
      {currentAction === "useScanDocumentFrontValidity" && (
            <div>
              <div>{`Scan Document Result: ${
                isfoundValidity ? "Document found" : "not found"
              }`}</div>
            </div>
          )}
        </Camera>


      <div id="module_functions" className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleFrontDLValidity}>
        Scan Front Document
        </button>
      </div>
    </div>
  );
};

export default ScanValidity;
