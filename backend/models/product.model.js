import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    }
}, {
    timestamps:true // makes sure it has the created at and updated at fields on each doc
});

const Product = mongoose.model("Product", productSchema);

export default Product;
