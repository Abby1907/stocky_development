import mongoose from "mongoose";
const storeShema = new mongoose.Schema({
    store_name: String,
    address: String,
    store_type: String,
    employee_number: String,
    gst_number: String,
    store_id: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isActive: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});
const Store = mongoose.models.Store || mongoose.model("Store", storeShema);
export default Store;