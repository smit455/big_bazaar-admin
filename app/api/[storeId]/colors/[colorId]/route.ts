import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
    req:Request,
    {params }:{params:{colorId:string}}
){
    try {
        const {colorId} = await params
        if(!colorId) return new NextResponse("Color id is required",{status: 400})

        const color = await prismadb.color.findUnique({
        where: {
            id:colorId,
        }
        });
        return NextResponse.json(color)
    } catch (error) {
        console.log('[COLORS_GET]',error);
        return new NextResponse('Internal Server Error', {status: 500});
    }
}
export async function PATCH(
    req:Request,
    {params }:{params:{storeId:string , colorId:string}}
){
    try {
        const {userId} = await auth();
        const body = await req.json();
        const { name, value } = body;
        const {storeId} =await params
        const {colorId} =await params

        if(!userId) return new NextResponse("Unauthenticated",{status: 401})
        if(!name) return new NextResponse("Name is required",{status: 400})
        if(!value) return new NextResponse("Value is required",{status: 400})
        if(!colorId) return new NextResponse("Color id is required",{status: 400})

        
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                userId,
                id: storeId,
            }
        });

        if(!storeByUserId) return new NextResponse("Unauthorized",{status:403});
        
        const color = await prismadb.color.updateMany({
        where: {
            id:colorId,
        },
        data: {
            name,
            value
        }
        });
        return NextResponse.json(color)
    } catch (error) {
        console.log('[COLORS_PATCH]',error);
        return new NextResponse('Internal Server Error', {status: 500});
    }
}


export async function DELETE(
    req:Request,
    {params }:{params:{storeId:string , colorId:string}}
){
    try {
        const {userId} = await auth();
        const {colorId} = await params
        const {storeId} = await params

        if(!userId) return new NextResponse("Unauthenticated",{status: 401})
        if(!colorId) return new NextResponse("Color id is required",{status: 400})

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                userId,
                id: storeId,
            }
        });

        if(!storeByUserId) return new NextResponse("Unauthorized",{status:403});
        
        const color = await prismadb.color.deleteMany({
        where: {
            id:colorId,
        }
        });
        return NextResponse.json(color)
    } catch (error) {
        console.log('[COLORS_DELETE]',error);
        return new NextResponse('Internal Server Error', {status: 500});
    }
}