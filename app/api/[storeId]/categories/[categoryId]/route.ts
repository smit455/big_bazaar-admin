import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
    req:Request,
    {params }:{params:{categoryId:string}}
){
    try {
        const {categoryId} =await params

        if(!categoryId) return new NextResponse("Category id is required",{status: 400})

        const category = await prismadb.category.findUnique({
        where: {
            id:categoryId,
        },
        include: {
            billboard:true
        }

        });
        return NextResponse.json(category)
    } catch (error) {
        console.log('[CATEGORY_GET]',error);
        return new NextResponse('Internal Server Error', {status: 500});
    }
}
export async function PATCH(
    req:Request,
    {params }:{params:{storeId:string , categoryId:string}}
){
    try {
        const {userId} = await auth();
        const body = await req.json();
        const { name, billboardId } = body;
        const {categoryId} =await params
        const {storeId} =await params

        if(!userId) return new NextResponse("Unauthenticated",{status: 401})
        if(!name) return new NextResponse("Name is required",{status: 400})
        if(!billboardId) return new NextResponse("BillboardId is required",{status: 400})
        if(!categoryId) return new NextResponse("categoryId id is required",{status: 400})

        
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                userId,
                id: storeId,
            }
        });

        if(!storeByUserId) return new NextResponse("Unauthorized",{status:403});
        
        const category = await prismadb.category.updateMany({
        where: {
            id:categoryId,
        },
        data: {
            name,
            billboardId
        }
        });
        return NextResponse.json(category)
    } catch (error) {
        console.log('[CATEGORY_PATCH]',error);
        return new NextResponse('Internal Server Error', {status: 500});
    }
}


export async function DELETE(
    req:Request,
    {params }:{params:{storeId:string , categoryId:string}}
){
    try {
        const {userId} = await auth();
        const {categoryId} =await params
        const {storeId} = await params
        
        if(!userId) return new NextResponse("Unauthenticated",{status: 401})
        if(!categoryId) return new NextResponse("Category Id is required",{status: 400})

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                userId,
                id: storeId,
            }
        });

        if(!storeByUserId) return new NextResponse("Unauthorized",{status:403});
        const category = await prismadb.category.deleteMany({
        where: {
            id:categoryId,
        }
        });
        return NextResponse.json(category)
    } catch (error) {
        console.log('[CATEGORY_DELETE]',error);
        return new NextResponse('Internal Server Error', {status: 500});
    }
}