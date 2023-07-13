import styles from "../styles/Home.module.css";
import Camera from "./Camera";
import { useScanFrontDocument } from "../hooks";
import { canvasSizeOptions, isMobile } from "../utils";
import { useState } from "react";

const ScanFrontDocument = () => {
  const [canvasSize, setCanvasSize] = useState();

  const handleFrontSuccess = (result) => {
    console.log("FRONT SCAN DATA: ", result);
  };
  const {
    scanFrontDocument,
    isFound,
    resultStatus,
    documentUUID,
    documentGUID,
    setShouldTriggerCallback,
    resultResponse,
  } = useScanFrontDocument(handleFrontSuccess);
  const handleCallbackFromCanvasSizeChange = (size) => {
    setCanvasSize(size);
    setTimeout(async () => scanFrontDocument(size), 1000);
  };

  const handleScanDLFront = async () => {
    // hack to initialize canvas with large memory, so it doesn't cause an issue.
    if (canvasSize) {
      await scanFrontDocument(canvasSize);
    } else {
      if (!isMobile) {
        await scanFrontDocument(canvasSizeOptions[3].value, () => {});
      }
      await scanFrontDocument();
    }
  };

  return (
    <div id="canvasInput" className={styles.container}>
      <Camera
        handleCanvasSizeChange={handleCallbackFromCanvasSizeChange}
        currentAction={"useScanDocumentFront"}
      >
        <div>
          <h2> {`Confidence Value: ${resultResponse?.conf_level}`}</h2>
          <div>{`Predict Status: ${resultResponse?.predict_message}`}</div>
          <div>{`Scan Document Result: ${resultResponse?.op_message}`}</div>
          <div>{`Has found valid document: ${isFound}`}</div>
          <div>{`Document GUID: ${documentGUID}`} </div>
          <div>{`Document UUID: ${documentUUID}`} </div>
        </div>
      </Camera>

      <div id="module_functions" className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleScanDLFront}>
          Scan Front Document
        </button>
      </div>
    </div>
  );
};

export default ScanFrontDocument;

