import mongoose,{Schema} from 'mongoose'

const productSchema = new Schema({
    id:Number,
    title:String,
    price:Number,
    description:String,
    category:String,
    qty:Number,
    image:String,
    images:Array,
    specifications:{type:Array,default:[]},
    variants:{type:Object,default:{}},
    wish:Boolean,
    rating:{
        rate:Number,
        count:Number
    }

});

const Product = mongoose.models.Product ||mongoose.model('Product',productSchema);

export default Product;