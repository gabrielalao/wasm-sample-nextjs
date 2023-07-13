import { useState } from "react";
import { isValid } from "@privateid/cryptonets-web-sdk";


const useIsValid = () => {
  const [loop, setLoop] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [exposureValue, setExposureValue] = useState(0);

  const isValidCall = async (loopIsValid) => {
    setLoop(loopIsValid);
    setTimeout(()=>{
       isValid(callback, undefined, {
        input_image_format: "rgba",
      });
    },500)
  };

  const callback = async (result) => {
    console.log("callback hook result isValid:", result);
    switch (result.status) {
      case "WASM_RESPONSE":
        if (result.returnValue.faces.length === 0) {
          setFaceDetected(false);
        } else {
          setFaceDetected(true);
        }
        setExposureValue(result?.returnValue?.exposure);
        break;
      default:
    }
    if (loop) {
      isValidCall(loop);
    }
  };

  return {
    faceDetected,
    isValidCall,
    hasFinished,
    setHasFinished,
    exposureValue,
  };
};

export default useIsValid;
