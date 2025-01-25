import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
    req:Request,
    {params }:{params:Promise<{sizeId:string}>}
){
    try {
        const {sizeId}=await params
        if(!sizeId) return new NextResponse("Size id is required",{status: 400})

        const size = await prismadb.size.findUnique({
        where: {
            id:sizeId,
        }
        });
        return NextResponse.json(size)
    } catch (error) {
        console.log('[SIZES_GET]',error);
        return new NextResponse('Internal Server Error', {status: 500});
    }
}
export async function PATCH(
    req:Request,
    {params }:{params:Promise<{storeId:string , sizeId:string}>}
){
    try {
        const {userId} = await auth();
        const body = await req.json();
        const { name, value } = body;
        const {storeId} =await params
        const {sizeId}=await params

        if(!userId) return new NextResponse("Unauthenticated",{status: 401})
        if(!name) return new NextResponse("Name is required",{status: 400})
        if(!value) return new NextResponse("Value is required",{status: 400})
        if(!sizeId) return new NextResponse("Size id is required",{status: 400})

        
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                userId,
                id: storeId,
            }
        });

        if(!storeByUserId) return new NextResponse("Unauthorized",{status:403});
        
        const size = await prismadb.size.updateMany({
        where: {
            id:sizeId,
        },
        data: {
            name,
            value
        }
        });
        return NextResponse.json(size)
    } catch (error) {
        console.log('[SIZES_PATCH]',error);
        return new NextResponse('Internal Server Error', {status: 500});
    }
}


export async function DELETE(
    req:Request,
    {params }:{params:Promise<{storeId:string , sizeId:string}>}
){
    try {
        const {userId} = await auth();
        const {sizeId}=await params
        const {storeId} = await params
        if(!userId) return new NextResponse("Unauthenticated",{status: 401})
        if(!sizeId) return new NextResponse("Size id is required",{status: 400})

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                userId,
                id: storeId,
            }
        });

        if(!storeByUserId) return new NextResponse("Unauthorized",{status:403});
        
        const size = await prismadb.size.deleteMany({
        where: {
            id:sizeId,
        }
        });
        return NextResponse.json(size)
    } catch (error) {
        console.log('[SIZES_DELETE]',error);
        return new NextResponse('Internal Server Error', {status: 500});
    }
}