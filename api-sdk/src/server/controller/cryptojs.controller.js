import * as CryptoJS from 'crypto-js';

const secretKey = 'Thanh71311@';

export default class CryptojsController {
  encrypt(text = '', secret = secretKey) {
    const keyBytes = CryptoJS.SHA256(secret);
    const encrypted = CryptoJS.AES.encrypt(text, keyBytes, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return {data: encrypted.toString()};
  }

  decrypt(text = '',  secret = secretKey) {
    const keyBytes = CryptoJS.SHA256(secret);
    const decrypted = CryptoJS.AES.decrypt(text, keyBytes, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return {data: decrypted.toString(CryptoJS.enc.Utf8) };
  }
}
