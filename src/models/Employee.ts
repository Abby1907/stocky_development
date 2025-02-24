import mongoose from "mongoose";
const EmployeeSheama = new mongoose.Schema({
    email: String,
    password: String,
    role: String,
    storeIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    }],
    isActive: {
        type: Boolean,
        default: true
    },
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
const Employee = mongoose.models.Employee || mongoose.model("Employee", EmployeeSheama);
export default Employee;