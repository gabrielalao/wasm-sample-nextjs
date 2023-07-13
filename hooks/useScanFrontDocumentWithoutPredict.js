import { useEffect, useState } from "react";
import {
  convertCroppedImage,
  isValidPhotoID,
} from "@privateid/cryptonets-web-sdk";

const useScanFrontDocumentWithoutPredict = (setShowSuccess = () => {}) => {
  const [scanResult, setScanResult] = useState(null);
  const [scannedIdData, setScannedIdData] = useState(null);
  const [isFound, setIsFound] = useState(false);
  const [isMugshotFound, setIsMugshotFound] = useState(null);
  const [inputImageData, setInputImageData] = useState(null);
  const [inputImage, setInputImage] = useState(null);
  // Getting mugshot from document scan
  const [predictMugshotRaw, setPredictMugshotRaw] = useState(null);
  const [predictMugshotImageData, setPredictMugshotImageData] = useState(null);
  const [predictMugshotImage, setPredictMugshotImage] = useState(null);

  // Cropped Front Document
  const [croppedDocumentImageData, setCroppedDocumentImageData] =
    useState(null);
  const [croppedDocumentImage, setCroppedDocumentImage] = useState(null);
  const [returnValue, setResultValue] = useState(null);

  const [frontScanData, setFrontScanData] = useState(null);

  const documentCallback = (result) => {
    console.log("Front scan callback result:", result);
    setFrontScanData(result);
    if (
      // (result.returnValue.op_status === 0 ||
      //   result.returnValue.op_status === 10) &&
      result.returnValue.conf_level > 0.85 &&
      result.returnValue.cropped_doc_width &&
      result.returnValue.cropped_face_width
    ) {
      setIsFound(true);
      setShowSuccess(true);
      setResultValue(result.returnValue);
      // setPredictMugshotHeight(result.returnValue.cropped_face_height);
      // setPredictMugshotWidth(result.returnValue.cropped_face_width);
      // setCroppedDocumentHeight(result.returnValue.cropped_doc_height)
      // setCroppedDocumentWidth(result.returnValue.cropped_doc_width)
    } else {
      setIsFound(false);
      scanFrontDocument();
    }
  };

  const doConvert = async () => {
    try {
      const mugshotBase64 = await convertCroppedImage(
        predictMugshotRaw,
        returnValue.cropped_face_width,
        returnValue.cropped_face_height
      );
      console.log("Mugshot image:", mugshotBase64);
      setPredictMugshotImage(mugshotBase64);
      return mugshotBase64;
    } catch (e) {}
  };

  const convertCroppedDocument = async () => {
    try {
      const mugshotBase64 = await convertCroppedImage(
        croppedDocumentImageData,
        returnValue.cropped_doc_width,
        returnValue.cropped_doc_height
      );
      console.log("Cropped Document:", mugshotBase64);
      setCroppedDocumentImage(mugshotBase64);
      return mugshotBase64;
    } catch (e) {}
  };

  const convertImageData = async () => {
    try {
      const inputImageBase64 = await convertCroppedImage(
        inputImageData,
        returnValue.image_width,
        returnValue.image_height
      );
      console.log("InputImage:", inputImageBase64);
      setInputImage(inputImageBase64);
      return inputImageBase64;
    } catch (e) {}
  };

  // Cropped Document
  useEffect(() => {
    if (isFound && croppedDocumentImageData && returnValue) {
      convertCroppedDocument();
    }
  }, [isFound, croppedDocumentImageData, returnValue]);

  useEffect(() => {
    if (isFound && predictMugshotRaw && returnValue) {
      const image = new ImageData(
        predictMugshotRaw,
        returnValue.cropped_face_width,
        returnValue.cropped_face_height
      );
      setPredictMugshotImageData(image);
      setIsMugshotFound(true);
      doConvert();
    }
  }, [isFound, predictMugshotRaw, returnValue]);

  // Cropped Document
  useEffect(() => {
    if (isFound && inputImageData && returnValue) {
      convertImageData();
    }
  }, [isFound, inputImageData, returnValue]);

  const scanFrontDocument = async () => {
    const {
      result: resultData,
      croppedDocument,
      croppedMugshot,
      imageData,
    } = await isValidPhotoID(
      "PHOTO_ID_FRONT",
      documentCallback,
      false,
      undefined,
      {}
    );

    setPredictMugshotRaw(croppedMugshot);
    setCroppedDocumentImageData(croppedDocument);
    setInputImageData(imageData);
    console.log(croppedDocument, croppedMugshot, imageData);

    console.log("Validate DL", resultData);
  };

  return {
    scanResult,
    scanFrontDocument,
    isFound,
    isMugshotFound,
    scannedIdData,
    predictMugshotImageData,
    predictMugshotImage,
    croppedDocumentImage,
    frontScanData,
  };
};

export default useScanFrontDocumentWithoutPredict;
