import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req:Request,
    {params}:{params:{storeId:string}}
){
    try {
        const {userId} = await auth()
        const body = await req.json();
        const {name, value} = body
        const {storeId} = await params

        if(!userId) return new NextResponse("Unauthenticated",{status:401});
        if(!name) return new NextResponse("Name is required",{status:400});
        if(!value) return new NextResponse("Value is required",{status:400});
        if(!storeId) return new NextResponse("Store id is required",{status:400});
        
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                userId,
                id: storeId,
            }
        });

        if(!storeByUserId) return new NextResponse("Unauthorized",{status:403});
        const color = await prismadb.color.create({
            data: {
                name,
                value,
                storeId: storeId,
            }
        })

        return NextResponse.json(color)
    } catch (error) {
        console.log('[COLORS_POST',error);
        return new NextResponse("Internal Server Error",{status:500});
    }
}

export async function GET(
    req:Request,
    {params}:{params:{storeId:string}}
){
    try {
        
        const {storeId} = await params
        if(!storeId) return new NextResponse("Store id is required",{status:400});
        
        const colors = await prismadb.color.findMany({
            where: {
                storeId: storeId,
            }
        })

        return NextResponse.json(colors)
    } catch (error) {
        console.log('[COLORS_GET',error);
        return new NextResponse("Internal Server Error",{status:500});
    }
}