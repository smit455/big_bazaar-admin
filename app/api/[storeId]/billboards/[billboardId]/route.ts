import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
    req:Request,
    {params }:{params:{billboardId:string}}
){
    try {
        const {billboardId} = await params
        if(!billboardId) return new NextResponse("Billboard id is required",{status: 400})

        const billboard = await prismadb.billboard.findUnique({
        where: {
            id:billboardId,
        }
        });
        return NextResponse.json(billboard)
    } catch (error) {
        console.log('[BILLBOARD_GET]',error);
        return new NextResponse('Internal Server Error', {status: 500});
    }
}
export async function PATCH(
    req:Request,
    {params }:{params:{storeId:string , billboardId:string}}
){
    try {
        const {userId} = await auth();
        const body = await req.json();
        const { label, imageUrl } = body;
        const {storeId} = await params
        const {billboardId}=await params

        if(!userId) return new NextResponse("Unauthenticated",{status: 401})
        if(!label) return new NextResponse("Label is required",{status: 400})
        if(!imageUrl) return new NextResponse("Image is required",{status: 400})
        if(!billboardId) return new NextResponse("Billboard id is required",{status: 400})

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                userId,
                id: storeId,
            }
        });

        if(!storeByUserId) return new NextResponse("Unauthorized",{status:403});
        
        
        const billboard = await prismadb.billboard.updateMany({
        where: {
            id:billboardId,
        },
        data: {
            label,
            imageUrl
        }
        });
        return NextResponse.json(billboard)
    } catch (error) {
        console.log('[BILLBOARD_PATCH]',error);
        return new NextResponse('Internal Server Error', {status: 500});
    }
}


export async function DELETE(
    req:Request,
    {params }:{params:{storeId:string , billboardId:string}}
){
    try {
        const {storeId} = await params
        const {billboardId}=await params
        const {userId} = await auth();

        if(!userId) return new NextResponse("Unauthenticated",{status: 401})
        if(!billboardId) return new NextResponse("Billboard id is required",{status: 400})

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                userId,
                id: storeId,
            }
        });

        if(!storeByUserId) return new NextResponse("Unauthorized",{status:403});
        
        const billboard = await prismadb.billboard.deleteMany({
        where: {
            id:billboardId,
        }
        });
        return NextResponse.json(billboard)
    } catch (error) {
        console.log('[BILLBOARD_DELETE]',error);
        return new NextResponse('Internal Server Error', {status: 500});
    }
}