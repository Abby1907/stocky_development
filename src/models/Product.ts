import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    productName: String,
    quantity: Number,
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    },
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
});
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;