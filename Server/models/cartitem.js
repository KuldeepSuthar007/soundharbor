const mongoose = require('mongoose');
const { Schema } = mongoose;


const cartItemSchema = new Schema(
    {
        userId: {
            type: String,
            ref: "User",
            required: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },

    });



module.exports = mongoose.model("CartItem", cartItemSchema);