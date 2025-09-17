export function parseOptionalFloat(value) {
  if (value === undefined || value === null) {
    return null;
  }
  const strValue = String(value).trim();
  if (strValue === "") {
    return null;
  }
  const num = parseFloat(strValue);
  return isNaN(num) ? null : num;
}

export function parseOptionalInt(value, radix = 10) {
  if (value === undefined || value === null) {
    return null;
  }
  const strValue = String(value).trim();
  if (strValue === "") {
    return null;
  }
  const num = parseInt(strValue, radix);
  return isNaN(num) ? null : num;
}

export const parseJsonField = (valStr, defaultVal) => {
  if (typeof valStr === "string" && valStr.trim() !== "") {
    try {
      return JSON.parse(valStr);
    } catch (e) {
      return defaultVal;
    }
  }
  return defaultVal;
};
