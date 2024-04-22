/**
 * copy text to clipboard
 * @param text
 */
export const copyToClipboard = async (text: string) => {
  // Navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    // message.info(`Copied ${text}`)
  } else {
    // Use the 'out of viewport hidden text area' trick
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Move textarea out of the viewport so it's not visible
    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";

    document.body.prepend(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      // message.info(`Copied ${text}`)
    } catch (error) {
      console.error(error);
    } finally {
      textArea.remove();
    }
  }
};
/**
 * reduce balance
 * @if not number, return "0";
 * @if > 10e+7 10M
 * @if > 10e+4 10K
 * @if 0.001234 0.0012
 * @if 1.000000 1
 *
 * @param number 12.0000123451
 * @returns string
 *
 */
export const reduceAmount = (number: number | string | unknown | bigint, len = 2) => {
  try {
    if (isNaN(number as number)) throw "0";
    const num = Math.floor(number as number);
    if (num >= 10 ** 7) throw (num / 10 ** 6).toFixed(2) + "M";
    if (num >= 10 ** 4) throw (num / 10 ** 3).toFixed(2) + "K";
    const decimal = ((number as number) - num).toString();
    let count = 0;
    for (let i = 2; i < decimal.length; i++) {
      if (decimal[i] == "0") {
        count++;
      } else {
        break;
      }
    }
    // count = 0;
    const _deciaml = Number(decimal).toFixed(count + len);
    throw num + _deciaml.substring(1, _deciaml.length);
  } catch (value: any) {
    return value as string;
  }
};
/**
 * reduce balance
 * @if not number, return "0";
 * @if 0.001234 0.0012
 * @if 1.000000 1
 *
 * @param number 12.0000123451
 * @returns string
 *
 */
export const parseNumber = (number: number | string | unknown, len = 2) => {
  try {
    if (isNaN(number as number)) throw "0";
    const num = Math.floor(number as number);
    const decimal = ((number as number) - num).toLocaleString();

    console.log(num, decimal);
    let count = 0;
    for (let i = 2; i < decimal.length; i++) {
      if (decimal[i] == "0") {
        count++;
      } else {
        break;
      }
    }
    // count = 0;
    const _deciaml = Number(decimal).toFixed(count + len);
    throw num + _deciaml.substring(1, _deciaml.length);
  } catch (value: any) {
    return value as number;
  }
};

/**
 * reduce address to shorter
 * @param address "0x29f95970cd0dd72cd7d6163b78693fe845daf796"
 * @param length length to cut from start and end
 * @returns "0x2...796"
 */
export const reduceAddress = (
  address: string = "0x29f95970cd0dd72cd7d6163b78693fe845daf796",
  length: number = 4
) => {
  return (
    address.substring(0, length) +
    "..." +
    address.substr(address.length - length, length)
  );
};
// @dev generate random number
export const _randomNumber = () => {
  return Math.floor(Math.random() * 1000000000);
}