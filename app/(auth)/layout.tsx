export default function AuthLayout({
    children
}:{
    children: React.ReactNode
}){
    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow flex flex-col items-center justify-center">
                {children}
            </div>
        </div>
    )
}