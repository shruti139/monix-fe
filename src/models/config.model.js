const mongoose = require("mongoose");

const configSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    accessToken: {
      type: String,
      trim: true,
    },
    refreshToken: {
      type: String,
      trim: true,
    },
    accessTokenExpire: {
      type: Number,
      trim: true,
    },
    refreshTokenExpire: {
      type: Number,
      trim: true,
    },
    clientId: {
      type: String,
      trim: true,
    },
    clientSecret: {
      type: String,
      trim: true,
    },
    role: {
      type: Number,
    },
    redirect_uri: {
      type: String,
      trim: true,
  },
},

  { timestamps: true }
);
module.exports = mongoose.models.config || new mongoose.model("config", configSchema);
