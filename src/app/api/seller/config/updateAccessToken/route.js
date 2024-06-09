import { connectToDB } from "@/config/dbConnection";
import configModel from "@/models/config.model";
import axios from "axios";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { validate } from "uuid";
import { connectValidation } from "@/validation/user";
export const GET = async (request) => {
  try {
    await connectToDB();

    const checkConfig = await configModel.find();
    await Promise.all(
      checkConfig.map(async (customer) => {
        
        const authBody = {
          grant_type: "refresh_token",
          scope: process.env.API_SCOPE,
          refresh_token:customer?.refreshToken
        }
    
        const res = await axios.post(`${process.env.EBAY_BASE_URL}identity/v1/oauth2/token`, authBody, {
          headers: {
            Authorization: "Basic " + Buffer.from(customer?.clientId + ":" + customer?.clientSecret).toString("base64"),
            'content-type': 'application/x-www-form-urlencoded'
          }
        })
        const data = res?.data 
    
         return  await configModel
            .findByIdAndUpdate(
              { _id: customer?._id },
              {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                accessTokenExpire: data.expires_in,
                refreshTokenExpire: data.refresh_token_expires_in,
              
              },
              { new: true }
            )
            .then((config) => {
              return config
            })
            .catch((error) => {
              return NextResponse.json(
                {
                error: error.message,
                message: "Something went wrong, please try again!",
                isSuccess: false,
              }, { status: 500 });
            });
        

      }))
      return NextResponse.json({ message:"Token Updated" , success: true },{ status: 200 });
   
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
