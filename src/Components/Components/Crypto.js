import CryptoJS from "crypto-js";

const secretKey =
  "diesIsAtamdynShahmatOinogonUchun-33JahtaBolupEnemdinJANAEsendin";

export const encrypt = (text) => {
  const iv = CryptoJS.lib.WordArray.random(16); // Zufälliger IV
  const key = CryptoJS.enc.Utf8.parse(secretKey); // Konvertiere den Schlüssel in WordArray
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return iv.toString() + ":" + encrypted.toString(); // IV und verschlüsselter Text zusammengeben
};

// Entschlüsselung
export const decrypt = (encryptedText) => {
  const [ivStr, encryptedStr] = encryptedText.split(":");
  const iv = CryptoJS.enc.Hex.parse(ivStr); // IV konvertieren
  const key = CryptoJS.enc.Utf8.parse(secretKey); // Konvertiere den Schlüssel in WordArray

  const decrypted = CryptoJS.AES.decrypt(encryptedStr, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8); // Dekodieren
};

export const shortenText = (text, length) => {
  if (text.length <= length) {
    return text;
  }
  return text.substring(0, length) + "...";
};
