import styles from "../styles/Home.module.css";
import Camera from "./Camera";
import { useScanBackDocument } from "../hooks";
import { useState } from "react";

const ScanBackDocument = () => {
  const [canvasSize, setCanvasSize] = useState();

  // Scan Document Back
  const handleBackSuccess = (result) => {
    console.log("BACK SCAN DATA: ", result);
  };
  const { scanBackDocument, scannedCodeData, barcodeStatusCode } =
    useScanBackDocument(handleBackSuccess);
  const handleScanDocumentBack = async () => {
    await scanBackDocument(canvasSize);
  };

  const handleCallbackFromCanvasSizeChange = (size) => {
    setCanvasSize(size);
    setTimeout(async () => scanBackDocument(size), 1000);
  };

  return (
    <div id="canvasInput" className={styles.container}>
      <Camera
        handleCanvasSizeChange={handleCallbackFromCanvasSizeChange}
        currentAction={"useScanDocumentBack"}
      >
        <div>
          <h2> {`Barcode Status Code: ${barcodeStatusCode}`}</h2>
          <div>{`Scanned code data: ${
            scannedCodeData ? "success" : "not found"
          }`}</div>
          <div>{`First Name: ${
            scannedCodeData ? scannedCodeData.firstName : ""
          }`}</div>
          <div>{`Middle Name: ${
            scannedCodeData ? scannedCodeData.middleName : ""
          }`}</div>
          <div>{`Last Name: ${
            scannedCodeData ? scannedCodeData.lastName : ""
          }`}</div>
          <div>{`Date of Birth: ${
            scannedCodeData ? scannedCodeData.dateOfBirth : ""
          }`}</div>
          <div>{`Gender: ${
            scannedCodeData ? scannedCodeData.gender : ""
          }`}</div>
          <div>{`Street Address1: ${
            scannedCodeData ? scannedCodeData.streetAddress1 : ""
          }`}</div>
          <div>{`Street Address2: ${
            scannedCodeData ? scannedCodeData.streetAddress2 : ""
          }`}</div>
          <div>{`City: ${scannedCodeData ? scannedCodeData.city : ""}`}</div>
          <div>{`Postal Code: ${
            scannedCodeData ? scannedCodeData.postCode : ""
          }`}</div>
        </div>
      </Camera>

      <div id="module_functions" className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleScanDocumentBack}>
          Scan Back Document
        </button>
      </div>
    </div>
  );
};

export default ScanBackDocument;
