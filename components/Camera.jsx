import { closeCamera, switchCamera } from "@privateid/cryptonets-web-sdk-alpha";
import React, { useEffect, useMemo, useState } from "react";
import { useCamera, useWasm } from "../hooks";
import styles from "../styles/Home.module.css";
import {
  CANVAS_SIZE,
  canvasSizeOptions,
  isAndroid,
  isBackCamera,
  isIOS,
  osVersion,
  setMax2KForMobile,
  WIDTH_TO_STANDARDS,
} from "../utils";

const Camera = ({
  children,
  getDeviceId,
  handleCanvasSizeChange,
  currentAction,
}) => {
  const { ready: wasmReady } = useWasm();
  const elementId = "userVideo";
  const { ready, init, device, devices, settings, capabilities } =
    useCamera(elementId);
  const isBack = isBackCamera(devices, device);
  const [canvasSize, setCanvasSize] = useState();
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
  const initialCanvasSize = WIDTH_TO_STANDARDS[settings?.width];
  const [deviceId, setDeviceId] = useState(device);
  const [devicesList] = useState(devices);
  const isDocumentScan = [
    "useScanDocumentFront",
    "useScanDocumentBack",
    "useScanDocumentFrontValidity",
  ].includes(currentAction);

  useEffect(() => {
    if (!wasmReady) return;
    if (!ready) init();
    if (isIOS && osVersion < 15) {
      console.log("Does not support old version of iOS os version 15 below.");
    } else if (isAndroid && osVersion < 11) {
      console.log(
        "Does not support old version of Android os version 11 below."
      );
    }
    console.log("--- wasm status ", wasmReady, ready);
  }, [wasmReady, ready]);

  const handleReopenCamera = async () => {
    await init();
  };

  const handleCloseCamera = async () => {
    await closeCamera(elementId);
  };

  const handleSwitchCamera = async (e) => {
    setDeviceId(e.target.value);
    const { capabilities = {}, settings = {}, devices } = await switchCamera(null, e.target.value);
    setDeviceCapabilities(capabilities);
    // setDevicesList(devices.map(mapDevices));
    if (isDocumentScan) {
      let width = WIDTH_TO_STANDARDS[settings?.width];
      if (width === "FHD" && settings?.height === 1440) {
        width = "iPhoneCC";
      }
      await handleCanvasSize({ target: { value: width } }, true);
    }
  };

  const handleCanvasSize = async (e, skipSwitchCamera = false) => {
    // setShouldTriggerCallback(false);
    setCanvasSize(e.target.value);
    const canvasSize = CANVAS_SIZE[e.target.value];
    if (!skipSwitchCamera) {
      const { capabilities = {}, settings } = await switchCamera(
        null,
        deviceId || device,
        canvasSize
      );
      setDeviceCapabilities(capabilities);
      // setDevicesList(devices.map(mapDevices));
    }
    handleCanvasSizeChange(e.target.value);
    // setShouldTriggerCallback(true);
  };

  useEffect(() => {
    if (getDeviceId) {
      getDeviceId(deviceId);
    }
  }, [deviceId]);

  return (
    <div className={styles.cameraContainer}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          padding: "10px",
        }}
      >
        <button onClick={handleReopenCamera}> Open Camera</button>
        <button onClick={handleCloseCamera}> Close Camera</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: isDocumentScan ? "space-between" : "center",
        }}
      >
        <div>
          <label> Select Camera: </label>
          <select
            value={deviceId || device}
            onChange={(e) => handleSwitchCamera(e)}
          >
            {(devicesList?.length ? devicesList : devices).map((e, index) => {
              return (
                <option id={e.value} value={e.value} key={index}>
                  {e.label}
                </option>
              );
            })}
          </select>
        </div>
        {isDocumentScan && ready ? (
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
        ) : null}
      </div>

      <video
        id="userVideo"
        className={`
                ${styles.cameraDisplay} 
                ${isBack || isDocumentScan ? "" : styles.mirrored}
              `}
        muted
        autoPlay
        playsInline
      />
      {children}
    </div>
  );
};

export default Camera;
