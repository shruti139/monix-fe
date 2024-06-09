import userModel from "@/models/user.model";
import { mongoose } from "mongoose";
const bcrypt = require("bcrypt");

export const connectToDB = async () => {
  // mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const email = process.env.ADMIN_EMAIL
    const findEmail = await userModel.findOne({ email });
    if (!findEmail) {
      const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const newCustomer = await userModel({
        userName:"Admin",
        email,
        password:password ,
        phoneNumber:process.env.ADMIN_PHONE_NUMBER,
        role: 1,
      });
      newCustomer.save();

    
    } 
   
  } catch (error) {
    throw new Error(error);
  }
    
};
