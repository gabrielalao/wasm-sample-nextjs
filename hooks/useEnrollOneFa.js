import { useState } from "react";
import { enroll1FA } from "@privateid/cryptonets-web-sdk";

const useEnrollOneFa = () => {
  const [faceDetected, setFaceDetected] = useState(false);
  const [enrollStatus, setEnrollStatus] = useState(null);
  const [progress, setProgress] = useState(0);
  const [enrollData, setEnrollData] = useState(null);

  let showError = false;

  const enrollUserOneFa = async (config) => {
    setFaceDetected(false);
    setEnrollStatus(null);
    setProgress(0);
    setEnrollData(null);
    // eslint-disable-next-line no-unused-vars
   await enroll1FA(callback, config|| {input_image_format:"rgba"});
  };

  const callback = async (result) => {
    console.log("enroll callback hook result:", result);
    switch (result.status) {
      case "VALID_FACE":
        setFaceDetected(true);
        setEnrollStatus("Please Hold Position");
        setProgress(result.progress);
        console.log("IsValid_face Conf", result);
        break;
      case "INVALID_FACE":
        console.log("INVALID FACE: ", result);
        if (!showError) {
          showError = true;
          setEnrollStatus(result.message);
          setFaceDetected(false);
          console.log("IsValid_face Conf", result);
          setTimeout(() => {
            showError = false;
          }, 500);
        }
        break;
      case "ENROLLING":
        setEnrollStatus("ENROLLING");
        setFaceDetected(true);
        break;
      case "WASM_RESPONSE":
        if (result.returnValue?.status === 0) {
          setEnrollStatus("ENROLL SUCCESS");
          setEnrollData(result.returnValue);
        }
        if (
          result.returnValue?.status === -1 ||
          result.returnValue?.status === -100 ||
          result.returnValue?.error === -1
        ) {
          setEnrollStatus("ENROLL FAILED, PLEASE TRY AGAIN");
        }
        break;
      default:
    }
  };

  return { faceDetected, enrollStatus, enrollData, enrollUserOneFa, progress };
};

export default useEnrollOneFa;
