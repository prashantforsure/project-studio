import { db } from '@/lib/db'

import { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import { PrismaAdapter } from '@auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }: { token: JWT, session: Session }): Promise<Session> {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.image = token.picture
      }
      
      return session
    },

    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          cognitoId: token.sub, // Using cognitoId as the unique identifier
        },
      })

      if (!dbUser) {
        if (!user) return token

        const newUser = await db.user.create({
          data: {
            cognitoId: token.sub!,
            username: `user_${Math.random().toString(36).slice(2, 9)}`, // Generate a random username
            profilePictureUrl: token.picture
          },
        })

        return {
          id: newUser.userId.toString(),
          username: newUser.username,
          picture: newUser.profilePictureUrl,
        }
      }

      return {
        id: dbUser.userId.toString(),
        username: dbUser.username,
        picture: dbUser.profilePictureUrl,
      }
    },

    redirect() {
      return '/'
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)