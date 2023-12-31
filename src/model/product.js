import mongoose, { mongo } from "mongoose";

const productschema=new mongoose.Schema({
    productimage:{
        type:String,
        required:true
    },
    productname:{
        type:String,
        required:true,
    },
    productinfo:{
        type:String,
        required:true
    },
    producttype:{
        type:String,
        required:true
    },
    productcost:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
    },
    pastdate:{
        type:Date,
        default:Date.now()
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    }],
    dislikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    }],
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"COMMENT"
    }]

})
productschema.pre(/^find/,function(next){
    this.populate({
        path:"comment",
        select:"comment createddate"
    })
    next()
})

const Product=mongoose.model("Product",productschema)
export default Product