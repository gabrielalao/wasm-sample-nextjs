
import styles from "../styles/Home.module.css";
import Camera from "./Camera";
import { useCamera, useScanBackDocument } from "../hooks";
import { canvasSizeOptions, CANVAS_SIZE, setMax2KForMobile, WIDTH_TO_STANDARDS } from "../utils";
import { useMemo, useState } from "react";
import { switchCamera } from "@privateid/cryptonets-web-sdk-alpha";

const ScanBackDocument = () => {
    const [deviceId, setDeviceId] = useState('')
    const [canvasSize, setCanvasSize] = useState();
    const { device, settings, capabilities } =
    useCamera("userVideo");
    const initialCanvasSize = WIDTH_TO_STANDARDS[settings?.width];
const [currentAction, setCurrentAction] = useState('');

    const handleCanvasSize = async (e, skipSwitchCamera = false) => {
        if (
          currentAction === "useScanDocumentBack"
        ) {
          setCanvasSize(e.target.value);
          const canvasSize = CANVAS_SIZE[e.target.value];
          if (!skipSwitchCamera) {
            const { capabilities = {} } = await switchCamera(
              null,
              deviceId || device,
              canvasSize
            );
            setDeviceCapabilities(capabilities);
            // setDevicesList(devices.map(mapDevices));
          }
    
          if (currentAction === "useScanDocumentFront") {
            setTimeout(async () => {
                await scanBackDocument(e.target.value);
              }, 1000);
          }
        }
      };


      const [deviceCapabilities, setDeviceCapabilities] = useState(capabilities);

      const canvasSizeList = useMemo(() => {
        let canvasList = [...canvasSizeOptions];
        const maxHeight =
          deviceCapabilities?.height?.max || capabilities?.height?.max;
        let label =
          WIDTH_TO_STANDARDS[
            setMax2KForMobile(
              deviceCapabilities?.width?.max || capabilities?.width?.max
            )
          ];
        const sliceIndex = canvasList.findIndex((option) => option.value === label);
        const slicedArr = canvasList.slice(sliceIndex);
        if (label === "FHD" && maxHeight === 1440) {
          return [{ label: "iPhoneCC", value: "iPhoneCC" }, ...slicedArr];
        }
        return slicedArr;
      }, [capabilities, deviceCapabilities]);

      // Scan Document Back
  const handleBackSuccess = (result) => {
    console.log("BACK SCAN DATA: ", result);
  };
  const { scanBackDocument, scannedCodeData, barcodeStatusCode } =
    useScanBackDocument(handleBackSuccess);
  const handleScanDocumentBack = async () => {
    setCurrentAction("useScanDocumentBack");
    await scanBackDocument();
  };

  return (
    <div id="canvasInput" className={styles.container}>
                  {currentAction === "useScanDocumentBack" ? (
            <div>
              <label> Canvas Size: </label>
              <select
                defaultValue={initialCanvasSize}
                value={canvasSize}
                onChange={(e) => handleCanvasSize(e)}
              >
                {canvasSizeList.map(({ label, value }) => (
                  <option id={value} value={value} key={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <></>
          )}
      <Camera isBack getDeviceId={e => setDeviceId(e)}>
      {currentAction === "useScanDocumentBack" && (
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
              <div>{`City: ${
                scannedCodeData ? scannedCodeData.city : ""
              }`}</div>
              <div>{`Postal Code: ${
                scannedCodeData ? scannedCodeData.postCode : ""
              }`}</div>
            </div>
          )}
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
