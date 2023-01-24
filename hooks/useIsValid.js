import { useState } from "react";
import { isValid } from "@privateid/cryptonets-web-sdk-alpha";

const useIsValid = (element = "userVideo", deviceId = null) => {
  const [faceDetected, setFaceDetected] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const isValidCall = async () => {
    // eslint-disable-next-line no-unused-vars
    const result = await isValid(callback);
    console.log("NEW IS VALID RETURNED DATA:", result);
    // result = undefined;
  };

  const callback = async (result) => {
    console.log("callback hook result isValid:", result);
    switch (result.status) {
      case "WASM_RESPONSE":
        if (result.returnValue.faces.length === 0) {
          setFaceDetected(false);
        } else {
          if (result.returnValue.faces[0].status === 0) {
            setFaceDetected(true);
          }
          if (result.returnValue.faces[0].status === -1) {
            setFaceDetected(false);
          }
        }
        setHasFinished(true);
        break;
      default:
    }
  };

  return { faceDetected, isValidCall, hasFinished, setHasFinished };
};

export default useIsValid;
