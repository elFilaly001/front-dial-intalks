import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import LinkedinProvider from 'next-auth/providers/linkedin';
import InstagramProvider from 'next-auth/providers/instagram';
import Credentials from "next-auth/providers/credentials";
import { getServerSession } from 'next-auth';
import type { AuthOptions, DefaultSession } from "next-auth";
import { Instagram } from 'lucide-react';
import { v1Api } from '@/services/axiosService';

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "select_account",
                }
            }
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
        InstagramProvider({
            clientId: process.env.INSTAGRAM_CLIENT_ID!,
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
        }),
        LinkedinProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID!,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
        }),
        // Credentials provider for username/password login
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    if (!credentials) return null;
                    const res = await v1Api.post("/auth/login", {
                        email: credentials.email,
                        password: credentials.password,
                    });
                    const data = res.data;
                    return {
                        id: data.user.id,
                        email: data.user.email,
                        name: data.user.name,
                        image: data.user.image,
                        token: data.token,
                    };
                } catch (error) {
                    return null;
                }
            },
        }),
    ],

    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production'
            }
        }
    },
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (account) {
                // OAuth access token
                // @ts-ignore
                token.accessToken = account.access_token;
            }
            if (user) {
                // When credentials provider returns a user object, persist id/token/image
                // @ts-ignore
                token.id = user.id;
                // @ts-ignore
                token.token = user.token;
                // @ts-ignore
                token.image = user.image;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                // @ts-ignore
                session.user.id = token.id as string;
                // @ts-ignore
                session.user.token = token.token as string;
                // @ts-ignore
                session.user.image = token.image as string;
            }
            return session;
        },
    },
    // Add these for better debugging
    debug: process.env.NODE_ENV === 'development',
};

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            token: string;
            id: string;
            image?: string;
        } & DefaultSession["user"];
    }

    interface User {
        token: string;
        id: string;
    }
}

// Provide a small server helper to fetch the session when used in server components
export async function auth() {
    return await getServerSession(authOptions as any);
}

