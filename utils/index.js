import Platform from "platform";

export const getDisplayedMessage = (result) => {
  switch (result) {
    case -1:
      return "No Face";
    case 0:
      return "Face detected";
    case 1:
      return "Image Spoof";
    case 2:
      return "Video Spoof";
    case 3:
      return "Video Spoof";
    case 4:
      return "Too far away";
    case 5:
      return "Too far to right";
    case 6:
      return "Too far to left";
    case 7:
      return "Too far up";
    case 8:
      return "Too far down";
    case 9:
      return "Too blurry";
    case 10:
      return "PLEASE REMOVE EYEGLASSES";
    case 11:
      return "PLEASE REMOVE FACEMASK";
    default:
      return "";
  }
};

export const isIOS = Platform.os.family === "iOS";
export const osVersion = Number(Platform.os.version);
export const isAndroid = Platform.os.family === "Android";
export const isMobile = isIOS || isAndroid;

export function getQueryParams(queryString) {
  const query = queryString.split("+").join(" ");
  const params = {};

  const regex = /(?:\?|&|;)([^=]+)=([^&|;]+)/g;
  const tokens = regex.exec(query);

  if (tokens && tokens.length > 2)
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  return params;
}

export const isBackCamera = (availableDevices, currentDevice) => {
  const mediaDevice = availableDevices.find(
      (device) => device.value === currentDevice
  );
  return mediaDevice?.label?.toLowerCase().includes("back");
};

export const canvasSizeOptions = [
  { label: "10K", value: "10K" },
  { label: "8K", value: "8K" },
  { label: "5K", value: "5K" },
  { label: "4K", value: "4K" },
  { label: "2K", value: "2K" },
  { label: "FHD (1080p)", value: "FHD" },
  { label: "UXGA", value: "UXGA" },
];

export const WIDTH_TO_STANDARDS = {
  1600: "UXGA",
  1920: "FHD",
  2560: "2K",
  4096: "4K",
  5120: "5K",
  7680: "8K",
  10240: "10K",
};

export const CANVAS_SIZE = {
  "10K": { width: 10240, height: 4320 },
  "8K": { width: 7680, height: 4320 },
  "5K": { width: 5120, height: 2880 },
  "4K": { width: 4096, height: 2160 },
  "2K": { width: 2560, height: 1440 },
  FHD: { width: 1920, height: 1080 },
  iPhoneCC: { width: 1920, height: 1440 },
  UXGA: { width: 1600, height: 1200 },
};

export const mapDevices = devices => ({label: devices.label, value: devices.deviceId})
