import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    address: {
        county: String,
        city: String,
        street: String,
    },
    id: String,
    username: String,
    fullname: String,
    email: String,
    phone: String,
    password: String,
    shippingAddress: [
        {
            county: String,
            city: String,
            street: String,
            postalCode: String
        }
    ],
    paymentMethods: [
        {
            accName: String,
            accNumber: Number,
            accType: { type: String, enum: ['mpesa', 'bank'] }
        }
    ]
})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;