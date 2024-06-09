const mongoose = require("mongoose");
const inventorySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },

        sku: {
            type: String,
            trim: true,
        },
        productTitle: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
        },

        productImage: [{
            type: String
        }],
        upc: [{
            type: String,
            trim: true,
        }],
        quantity: {
            type: String,
            trim: true,
        },
        condition: {
            type: String,
            trim: true,
        },
        brand: [{
            type: String,
            trim: true,

        }],

        type: [{
            type: String,
            trim: true,

        }],
    },
    { timestamps: true }
);
module.exports = mongoose.models.inventory ||new mongoose.model("inventory", inventorySchema);
