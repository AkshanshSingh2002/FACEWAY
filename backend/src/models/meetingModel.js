import { Schema } from "mongoose";

const meetingSchema = new Schema(
    {
        user_id: { type: String, required: true},
        meetingCode: { type: String, required: true, unique: true},
        data: {type: Date, default: Date.now}
    }
);

const Meeting = mongoose.Model('Meeting', meetingSchema);

export {Meeting};
