import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import getUser from "./actions/get-user"
import 'next-auth'

declare module 'next-auth' {
 interface User {
    username: string
 }
}

 
export const {handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      const userInfo = await getUser(session.user.email)
      if(!userInfo) {
        return session
      }
      session.user.username = userInfo.username
      return session
    },
  }
},
)