import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/config/dbConnection";
import inventoryModel from "@/models/inventory.model";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    let { pageNo, perPage, search } = reqBody;
    pageNo = pageNo ? pageNo : 1;
    perPage = perPage ? perPage : 10;
    const token = request.cookies.get("token")?.value || "";
    const authData = jwt.verify(token, process.env.TOKEN_SECRET);
    let filter = { userId: authData?.userId };
    if (!authData?.userId && !authData) {
        return NextResponse.json({ message: "Please provide valid token.", success: false }, { status: 203 });
    }
    const users = await inventoryModel
      .find(filter)
      .skip(perPage * pageNo - perPage)
      .limit(perPage)
      .sort({ _id: -1 });

    const totalRecords = await inventoryModel.countDocuments(filter);
    return NextResponse.json(
      {
        currentPageNo: pageNo,
        totalRecords,
        totalPages: Math.ceil(totalRecords / perPage),
        data: users,
        success: true,
        message: "Inventory Get successfully.",
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

