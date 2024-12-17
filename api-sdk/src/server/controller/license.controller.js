import TableCrudController from "./table.crud.controller";
import SendEmailController from "./send-email.controller";
import CryptojsController from "./cryptojs.controller";
const MANAGER_SHEET = "MANAGER_SHEET";
export default class LicenseController {

  constructor(tableCrud = new TableCrudController(), sendEmail = new SendEmailController(), cryptojs = new CryptojsController()) {
    this.tableCrud = tableCrud;
    this.sendEmail = sendEmail;
    this.cryptojs = cryptojs;
  }
  addLicense(obj) {

    const list = this.tableCrud.getAll(MANAGER_SHEET);
    const readyList = list.filter(item => item.phone === '' ||  item.phone == null );
    if(readyList.length > 0) {
      let pick = readyList[0];
      const save = {
        data : {
          id: pick.id,
          phone: obj.phone,
          email: obj.email,
          expiryDate: obj.expiryDate
        }
      }
      this.sendEmail.sendEmailThongBao("Mua license thành công", `
            Số điện thoại : ${obj.phone} <br>
            Ngày hết hạn: ${obj.expiryDate}<br>
            LICENSE=${this.cryptojs.encrypt(pick.id).data} <br>
            Vui lòng xem video này và làm theo hướng dẫn : <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">Link hướng dẫn</a>  <br>
      `, obj.email );
       this.tableCrud.add(MANAGER_SHEET, save);
      this.sendEmail.sendEmailThongBao("Khách hàng mua license thành công", `
      Số license còn lại : ${readyList.length - 1} <br>
      Thông tin khách hàng:  ${JSON.stringify(obj) }`, "k40cntt@gmail.com" );
      return {
        status:"SUCCESS",
        data: null,
        msg: "Đăng ký thành công"
      }
    } else {
      this.sendEmail.sendEmailThongBao("Google Sheet License đã hết", "Thông tin khách hàng: " + JSON.stringify(obj), "k40cntt@gmail.com" );
      return {
        status:"FAILED",
        data: obj,
        msg: "Vui lòng liên hệ quản trị viên để tạo thêm Sheet"
      }
    }
  }
}
