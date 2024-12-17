import { deleteProduct, makeJobSyncProduct, updateStock } from "../sync-product-kiot.job";


export const webHook = (obj)  => {
  ( obj.Notifications || [] ).forEach( it => {
      if((it.Action || '').startsWith('product.update')) {
        // Nhận được call back của kiot việt tạo triger 1 phút sau sync data
         makeJobSyncProduct(1);
      }
    if((it.Action || '').startsWith('product.delete')) {
      const client_RetailerId = (it.Action || '').replaceAll('product.delete.','');
      deleteProduct(client_RetailerId ,(it.Data || []))
    }
    if((it.Action || '').startsWith('stock.update')) {
      const client_RetailerId = (it.Action || '').replaceAll('stock.update.','');
      updateStock(client_RetailerId,(it.Data || []) );
    }

    // cho tinh nang khac
    if((it.Action || '').startsWith('customer.update')) {
      //handle customer update
    }
    if((it.Action || '').startsWith('customer.delete')) {
      //handle customer update
      //  (it.Data || []) id remove
    }

  })
}
