import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SettingForm } from "./components/settings-form";

interface SettingsPageProps{
    params:Promise<{
        storeId:string;
    }>
}

const SettingsPage:React.FC<SettingsPageProps> = async({params})=>{
    const {userId}=await auth();
    if(!userId) redirect("/sign-in")

    const {storeId}=await params
    const store = await prismadb.store.findFirst({
        where:{
            id:storeId,
            userId
        }
    })
    if(!store) redirect("/")
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingForm initialData={store}/>
            </div>
        </div>
    )   
} 

export default SettingsPage