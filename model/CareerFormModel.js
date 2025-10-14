import mongoose from "mongoose";

const CareerFormSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        phoneNo: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        jobApplied: {
            type: String,
            required: true,
            trim: true,
        },
        resume: {
            type: String, // store file path or URL
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const CareerFormModel = mongoose.model("Career", CareerFormSchema);
export default CareerFormModel;