import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { Gender } from "@prisma/client"
import getOrCreateUser from "@/actions/get-or-create-user"
import { User } from "@/types"
import 'next-auth'

declare module 'next-auth' {
 interface User {
    username: string,
    first_name: string | null | undefined, 
    last_name: string | null | undefined, 
    bio: string | null,
    gender: Gender | null,
    codeforces_id: string | null | undefined,
    codeforces_verified: boolean | undefined,
    leetcode_id: string | null | undefined,
    leetcode_verified: boolean | undefined,
    codechef_id: string | null | undefined,
    codechef_verified: boolean | undefined,
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
      const userInfo = await getOrCreateUser(session.user.name, session.user.email, session.user.image)
      if(!userInfo) {
        return session
      }
      session.user.username = userInfo.username
      session.user.image = userInfo.avatar
      session.user.first_name = userInfo.first_name
      session.user.last_name = userInfo.last_name
      session.user.bio = userInfo.bio
      session.user.gender = userInfo.gender
      session.user.codechef_id = userInfo.codechef?.codechef_id
      session.user.codeforces_verified = userInfo.codeforces?.verified
      session.user.codeforces_id = userInfo.codeforces?.codeforces_id
      session.user.codechef_verified = userInfo.codechef?.verified
      session.user.leetcode_id = userInfo.leetcode?.leetcode_id
      session.user.leetcode_verified = userInfo.leetcode?.verified
      return session
    },
  }
},
)