import { connectToDB } from "@/config/dbConnection";
import configModel from "@/models/config.model";
import axios from "axios";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { validate } from "uuid";
import { connectValidation } from "@/validation/user";
export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const {error} = await connectValidation(reqBody);
    if (error) {
      return NextResponse.json(
          {
              success: false,
              message: error?.message,
          },
          {
              status: 203,
          }
      );
  }
    const { clientId, clientSecret,  code, redirect_uri } = reqBody;

    const token = request.cookies.get("token")?.value || "";
    const authData = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = authData?.userId;
    if (!userId && !authData) {
        return NextResponse.json({ message: "Please provide valid token.", success: false }, { status: 203 });
    }
    const authBody = {
      grant_type: "authorization_code",
      code,
      redirect_uri
    }

    const res = await axios.post(`${process.env.EBAY_BASE_URL}identity/v1/oauth2/token`, authBody, {
      headers: {
        Authorization: "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
    const data = res?.data 
    const checkConfig = await configModel.findOne({
      userId,
    });
    if (!checkConfig) {
      const newData = new configModel({
       accessToken: data.access_token,
        refreshToken: data.refresh_token,
        accessTokenExpire: data.expires_in,
        refreshTokenExpire: data.refresh_token_expires_in,
        redirect_uri,
        userId,
        clientId,
        clientSecret,
        role: 1,
      });
      newData.save();
      getInventoryFromEbay();

     return NextResponse.json({
        message: "Thank you for connecting account.",
        data: newData,
        isSuccess: true,
      },{ status: 200 });
    } else {
     return  await configModel
        .findByIdAndUpdate(
          { _id: checkConfig._id },
          {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            accessTokenExpire: data.expires_in,
            refreshTokenExpire: data.refresh_token_expires_in,
            redirect_uri,
          },
          { new: true }
        )
        .then((config) => {
          getInventoryFromEbay();
          return NextResponse.json({ data: config, success: true },{ status: 200 });

        
        })
        .catch((error) => {
          return NextResponse.json(
            {
            error: error.message,
            message: "Something went wrong, please try again!",
            success: false,
          }, { status: 500 });
        });
    }
    
   
  } catch (error) {
    return NextResponse.json(
      {
        error: error?.response?.data || error.message,
        success: false,
        message: "Something went wrong, please try agian!",
      },
      { status: 500 }
    );
  }
};


function getInventoryFromEbay() {
  axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/inventory`).then((data) => data).catch((err) => {
  });
}