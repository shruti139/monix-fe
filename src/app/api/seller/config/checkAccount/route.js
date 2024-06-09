import { connectToDB } from "@/config/dbConnection";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import configModel from "@/models/config.model";

export const GET = async (request) => {
    try {
      await connectToDB();
    //   const { error } = archivedFormValidate(reqBody);
    const token = request.cookies.get("token")?.value || "";
    const authData = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = authData?.userId || "664c3fd67a7e95b0394ad399";
    // if (!userId && !authData) {
    //     return NextResponse.json({ message: "Please provide valid token.", isSuccess: false }, { status: 203 });
    // }
    const checkConfig = await configModel.findOne({ userId });
    let connect = true;
    if (!checkConfig) {
      connect = false;
    }
    return NextResponse.json({
      connect: connect,
      checkConfig,
      isSuccess: true,
      message: `Account ${!connect ? "not" : ""} connected`,
    } ,{
        status: 200,
      });
   
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
  };
  