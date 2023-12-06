import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CONNECTION from "./connection";
import { User } from "./models/user";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/sign-in"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async session({ session }) {
            await CONNECTION()
            const isExist = await User.findOne({ email: session.user?.email })
            if (isExist) {
                // @ts-ignore
                session.user.id = isExist.id
                // @ts-ignore
                session.user.name = isExist.name
                // @ts-ignore
                session.user.email = isExist.email
                // @ts-ignore
                session.user.image = isExist.image
            }
            return session
        },
        async signIn({ profile }) {
            try {
                await CONNECTION()
                const isExist = await User.findOne({ email: profile?.email })
                if (!isExist) {
                    await User.create({
                        email: profile?.email,
                        name: profile?.name,
                        // @ts-ignore
                        image: profile?.picture
                    })
                }
                return true
            } catch (error) {
                return false
            }
        },
        redirect() {
            return "/"
        }
    }
}
export const getAuthSession = () => getServerSession(authOptions)