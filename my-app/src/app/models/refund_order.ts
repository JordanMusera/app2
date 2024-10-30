import mongoose, { Schema } from "mongoose";

const refundOrderSchema = new Schema({
    orderId:String,
    productId:String,
    status:{type:String,default:'pending'},
    order:Object,
    selectedReason:String,
    providedReason:String,
    images:Array
});

const RefundOrder = mongoose.models.RefundOrder||mongoose.model('RefundOrder',refundOrderSchema);
export default RefundOrder;