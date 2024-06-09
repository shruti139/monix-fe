import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";
import userModel from "@/models/user.model";
import { loginValidation } from "@/validation/user";
import { connectToDB } from "@/config/dbConnection";

// role: 1=Super Admin
export async function POST(request) {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const { error } = await loginValidation(reqBody);
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          error: error
        },
        {
          status: 203,
        }
      );
    }
    const { email, password } = reqBody;

    const findEmail = await userModel.findOne({ email });
    if (!findEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email not found!",
        },
        { status: 203 }
      );
    }
    const isMatch = await bcrypt.compare(password, findEmail.password);
    if (isMatch) {
      const authToken = jwt.sign(
        {
          userId: findEmail._id,
          email,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRE_TIME }
      );
      const response = NextResponse.json({
        message: "Login successfully.",
        authToken,
        userId: findEmail._id,
        role: findEmail.role,
        success: true,
        name: findEmail.userName,
      }, {
        status: 200
      });
      response.cookies.set("token", authToken, {
        httpOnly: true,
      });
      return response;

    } else {
      return NextResponse.json({ message: "Invalid password!", isSuccess: false }, { status: 203 });
    }


  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        success: false,
        message: "Something went wrong, please try agian!",
      },
      { status: 500 }
    );
  }
}
