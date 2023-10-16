import mongoose, { Schema, model } from "mongoose";
const productCollection="products";

const productShema= new mongoose.Schema({
    title:{type:String,max:20},
    description:{type:String,max:30},
    code:{type:String,max:30},
    price:{type:Number},
    status:{type:Boolean},
    stock:{type:Number},
    cat:{type:String,max:30}
});

const productModel= mongoose.model(productCollection,productShema);
export default productModel