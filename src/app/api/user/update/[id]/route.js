import { connectToDB } from "@/config/dbConnection";
import userModel from "@/models/user.model";
import { createCustomerValidate } from "@/validation/user";
import { NextResponse } from "next/server";

export const PUT = async (request,route) => {
    try {
        await connectToDB();
        const reqBody = await request.json();
        const { id } = route.params;
        //   const { error } = archivedFormValidate(reqBody);
        // const { error } = createCustomerValidate(reqBody);
        // if (error) {
        //     return NextResponse.json(
        //         {
        //             success: false,
        //             message: error.message,
        //         },
        //         {
        //             status: 203,
        //         }
        //     );
        // }


        const findUser = await userModel.findById(id);
        if (!findUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User does not exist!",
                },
                { status: 203 }
            );

        }
        

        const updatedUser = await userModel.findByIdAndUpdate(id, reqBody, {
            new: true,
          });
        return NextResponse.json({
            message: "User updated successfully.",
            success: true,
            updatedUser,
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
