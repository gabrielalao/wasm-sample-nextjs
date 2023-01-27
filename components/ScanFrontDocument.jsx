
import styles from "../styles/Home.module.css";
import Camera from "./Camera";
import { useCamera, useScanFrontDocument } from "../hooks";
import { canvasSizeOptions, CANVAS_SIZE, isMobile, setMax2KForMobile, WIDTH_TO_STANDARDS } from "../utils";
import { useMemo, useState } from "react";
import { switchCamera } from "@privateid/cryptonets-web-sdk-alpha";

const ScanFrontDocument = () => {
    const [deviceId, setDeviceId] = useState('')
    const [canvasSize, setCanvasSize] = useState();
    const { device, settings, capabilities } =
    useCamera("userVideo");
    const initialCanvasSize = WIDTH_TO_STANDARDS[settings?.width];
const [currentAction, setCurrentAction] = useState('');

    const handleCanvasSize = async (e, skipSwitchCamera = false) => {
        if (
          currentAction === "useScanDocumentFront"
        ) {
          setShouldTriggerCallback(false);
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
          setShouldTriggerCallback(true);
    
          if (currentAction === "useScanDocumentFront") {
            setTimeout(async () => {
              await scanFrontDocument(e.target.value);
            }, 1000);
          }
        }
      };

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

      const [deviceCapabilities, setDeviceCapabilities] = useState(capabilities);

    const handleScanDLFront = async () => {
        setCurrentAction("useScanDocumentFront")
        // hack to initialize canvas with large memory, so it doesn't cause an issue.
        if (canvasSize) {
          await scanFrontDocument(canvasSize);
        } else {
          if (!isMobile) {
            await scanFrontDocument(canvasSizeOptions[3].value, () => {});
          }
          await scanFrontDocument(initialCanvasSize);
        }
      };

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

  return (
    <div id="canvasInput" className={styles.container}>
                  {currentAction === "useScanDocumentFront" ? (
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
      {currentAction === "useScanDocumentFront" && (
            <div>
              <h2> {`Confidence Value: ${resultResponse?.conf_level}`}</h2>
              <div>{`Predict Status: ${resultResponse?.predict_message}`}</div>
              <div>{`Scan Document Result: ${resultResponse?.op_message}`}</div>
              <div>{`Has found valid document: ${isFound}`}</div>
              <div>{`Document GUID: ${documentGUID}`} </div>
              <div>{`Document UUID: ${documentUUID}`} </div>
            </div>
          )}
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
