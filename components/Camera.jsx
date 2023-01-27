import { closeCamera, switchCamera } from '@privateid/cryptonets-web-sdk-alpha';
import React, { useEffect, useState } from 'react';
import { useCamera, useWasm } from '../hooks';
import styles from "../styles/Home.module.css";
import { isAndroid, isIOS, osVersion } from '../utils';

const Camera = ({children, getDeviceId, isBack}) => {
    const { ready: wasmReady } = useWasm();

    const { ready, init, device, devices } = useCamera("userVideo");
    const [deviceId, setDeviceId] = useState(device);
    const [devicesList] = useState(devices);

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
        await closeCamera();
      };

      const handleSwitchCamera = async (e) => {
        setDeviceId(e.target.value);
      };

      useEffect(() => {
        if(getDeviceId) {
          getDeviceId(deviceId)
        }
      }, [deviceId])

  return (
    <div className={styles.cameraContainer}>
      <div>
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
          <video
            id="userVideo"
            className={`
                ${styles.cameraDisplay} 
                ${isBack ? '' : styles.mirrored}
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
