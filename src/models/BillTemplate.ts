import mongoose from "mongoose";
const BillTemplateScheama = new mongoose.Schema({
    companyName: String,
    companyGstNumber: String,
    companyAddress: String,
    invoicePreFix: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},
{
    timestamps: true
});
const BillTemplate = mongoose.models.BillTemplate || mongoose.model("BillTemplate", BillTemplateScheama);
export default BillTemplate;