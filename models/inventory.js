const mongoose = require('mongoose');

const { Schema } = mongoose;

const InventorySchema=new Schema({
    productId:String,
    productName:String,
    qty:String,
    prize:String
})

InventorySchema.methods.toAuthJSON=function(){
    return{
        productId: this.productId,
        productName: this.productName,
        qty: this.qty,
        prize:this.prize,
    }
}

mongoose.model('Inventories',InventorySchema);