import errorMessages from "./errorMessages.json";
import successMessages from "./successMessages.json";
export type errorCodeType =
  | "E-10001"
  | "E-10002"
  | "E-10003"
  | "E-10004"
  | "E-10005"
  | "E-10006"
  | "E-10007"
  | "E-10008"
  | "E-10009"
  | "E-10010"
  | "E-10011"
  | "E-10012"
  | "E-10013";

export type sucessCodeType =
  | "S-10001"
  | "S-10002"
  | "S-10003"
  | "S-10004"
  | "S-10005"
  | "S-10006"
  | "S-10007"
  | "S-10008";
export function getErrorMessage(code: errorCodeType) {
  const errorMsg = errorMessages[code] && errorMessages[code].message;
  return errorMsg;
}

export function getSuccessMessage(code: sucessCodeType) {
  const successMsg = successMessages[code] && successMessages[code].message;
  return successMsg;
}
