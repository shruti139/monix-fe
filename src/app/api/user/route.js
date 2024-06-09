import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModal from "@/models/user.model";
import { connectToDB } from "@/config/dbConnection";

export const POST = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    let { pageNo, perPage, search } = reqBody;
    let filter = { role:{$ne: 1} };
    pageNo = pageNo ? pageNo : 1;
    perPage = perPage ? perPage : 10;
 
    const users = await UserModal
      .find(filter)
      .skip(perPage * pageNo - perPage)
      .limit(perPage)
      .sort({ _id: -1 });
    const totalRecords = await UserModal.countDocuments(filter);
    return NextResponse.json(
      {
        currentPageNo: pageNo,
        totalRecords,
        totalPages: Math.ceil(totalRecords / perPage),
        data: users,
        success: true,
        message: "Form Get successfully.",
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

function getPaginatedData(data, pageNo, perPage) {
  const startIndex = (pageNo - 1) * perPage;
  const endIndex = pageNo * perPage;
  const paginatedData = data.slice(startIndex, endIndex);
  return paginatedData;
}
