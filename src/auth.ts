import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@/generated/prisma'

// Create Prisma client instance
const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
	// Tell Auth.js to use Prisma for storing sessions
	adapter: PrismaAdapter(prisma),

	// Use database sessions instead of JWT
	session: {
		strategy: "database",
	},

	// Configure authentication providers
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
})