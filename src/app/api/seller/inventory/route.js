import { connectToDB } from "@/config/dbConnection";
import configModel from "@/models/config.model";
import axios from "axios";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { validate } from "uuid";
import { connectValidation } from "@/validation/user";
import userModel from "@/models/user.model";
import inventoryModel from "@/models/inventory.model";
export const GET = async (request) => {
    try {
        await connectToDB();

        const users = await userModel.find();
        const checkConfig = await configModel.find();

        await Promise.all(
            users.map(async (user) => {
                const config = checkConfig.find((config) => config?.userId == user?._id?.toString());
                if (config) {
                    let offset = 0
                   await getInventories(user, config,offset)
                }
            })
        )


        return NextResponse.json({ message: "Inventory get successfully", success: true }, { status: 200 });

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


const getInventories = async (user, config,offset) => {
    const res = await axios.get(`${process.env.EBAY_BASE_URL}sell/inventory/v1/inventory_item?offset=${offset}&limit=1`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${config?.accessToken}`
        }

    })
    if (res?.data?.inventoryItems?.length == 0 || !res?.data?.inventoryItems) {
        return
    }

    const inventories = []
    await Promise.all(
        res?.data?.inventoryItems?.map(async (item) => {
            const inventory = await inventoryModel.findOne({ userId: user?._id, sku: item?.sku })
            const product = {
                productTitle: item?.product?.title,
                sku: item?.sku,
                description: item?.product?.description,
                productImage: item?.product?.imageUrls,
                upc: item?.product?.upc,
                quantity: item?.availability?.shipToLocationAvailability?.quantity,
                condition: item?.condition,
                brand: item?.product?.aspects?.Brand,
                type: item?.product?.aspects?.Type,
                userId: user?._id,
            }
            if (inventory) {
                inventories.push({
                    updateOne: {
                        filter: { userId: user?._id, sku: item?.sku },
                        update: {
                            $set: product,
                        },
                        upsert: true,
                    },
                });
            } else {
                inventories.push({
                    insertOne: {
                        document: product,
                    },
                });
            }
        })
    )

    inventoryModel.bulkWrite(inventories)
    offset = offset+1
    if(offset*res?.data?.size !== res?.data?.total){
        await getInventories(user, config,offset)
    }else {
        return
    }

}
