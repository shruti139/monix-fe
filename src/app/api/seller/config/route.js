import { connectToDB } from "@/config/dbConnection";
import configModel from "@/models/config.model";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
      await connectToDB();

      let config = {
        response_type : "code",
        scope:process.env.API_SCOPE
      };
     
        const checkConfig = await configModel.findOne({ role: 1 });
        config.clientId = checkConfig.clientId;
        config.redirect_uri = checkConfig.redirect_uri;
        config.clientSecret = checkConfig.clientSecret;
      
     
      return NextResponse.json(
        {
          success: true,
          config,
          message: "Config get successfully.",
        },
        { status: 200 }
      );
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
  