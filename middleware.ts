import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { DEFAULT_LOGIN_REDIRECT, forLoggedOutUsers, publicRoutes } from "@/routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req; 
    const isLoggedIn = !!req.auth; 
    const isPublicRoute = publicRoutes.some(route => 
        typeof route === 'string' ? route === nextUrl.pathname : route.test(nextUrl.pathname)
    );
    const isOnlyLoggedOut = forLoggedOutUsers.includes(nextUrl.pathname);
    const isApiRoute = nextUrl.pathname.startsWith("/api");
    if(isApiRoute){
        if(nextUrl.pathname.startsWith("/api/auth")) return;
        else{
            const token = req.headers.get('Authorization')?.split("Bearer ")[1];
            if(!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            try{
                if(token === process.env.API_TOKEN) return;
            }
            catch(e){
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
        }
    }
    if(isOnlyLoggedOut){
        if(isLoggedIn) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    if(!isLoggedIn && !isPublicRoute) return Response.redirect(new URL("/", nextUrl))
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};