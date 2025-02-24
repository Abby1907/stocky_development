import mongoose from "mongoose";

const AlertValueShema = new mongoose.Schema({
    value: Number,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});
const AlertValue = mongoose.models.AlertValue || mongoose.model("AlertValue", AlertValueShema);
export default AlertValue;