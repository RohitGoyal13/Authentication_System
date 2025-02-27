import { NextResponse } from "next/server"; 
import { cookies } from "next/headers";
import path from "path";

export async function GET() {
    try{
        (await cookies()).set("token", "",{
            httpOnly: true,
            expires: new Date(0),
            path: "/",
        });
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            }
        )
        return response;
    }catch(error:any){
        return NextResponse.json({error: error.message}, 
            {status: 500})
    }
}