import {getThongBaoTemplate} from "./template-email/thong-bao";
import { getTemplateOtp } from "./template-email/template-otp";
import * as CryptoJS from 'crypto-js';
export default class SendEmailController {
  sendEmail(recipient= '' , subject = '' , body = '') {
    GmailApp.sendEmail(recipient, subject, "", {htmlBody: body});
    return {status: 'SUCCESS' };
  }
  sendEmailThongBao(title = '' , content = '', recipient = '') {
    GmailApp.sendEmail(recipient, title, title, {htmlBody: getThongBaoTemplate(title,content)});
    return {status: 'SUCCESS' };
  }
  sendOtp(obj) {
    const {recipient, bytes } = obj.data;
    GmailApp.sendEmail(recipient, "[VetGo] Mã xác minh", "", {htmlBody: getTemplateOtp(this.decodeOtp(bytes))});
    return {status: 'SUCCESS' };
  }
   decodeOtp(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, 'VETGODEV');
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }
}
