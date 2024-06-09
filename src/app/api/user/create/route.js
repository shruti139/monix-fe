import { connectToDB } from "@/config/dbConnection";
import userModel from "@/models/user.model";
import { createCustomerValidate } from "@/validation/user";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");
export const POST = async (request) => {
    try {
        await connectToDB();
        const reqBody = await request.json();
        //   const { error } = archivedFormValidate(reqBody);
        const { error } = createCustomerValidate(reqBody);
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

        const { userName, email, password, phoneNumber } = reqBody

        const findEmail = await userModel.findOne({ email });
        if (findEmail) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email is already existing!",
                },
                { status: 203 }
            );

        }
        

        const Password = await bcrypt.hash(password, 10);
        const user = await userModel({
            userName,
            email,
            password: Password,
            phoneNumber,
            role: 2,
        });
        user.save();
        return NextResponse.json({
            message: "User added successfully.",
            success: true,
            user,
        }, { status: 200 });


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
