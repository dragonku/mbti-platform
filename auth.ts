import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // 여기서는 간단한 데모용 인증을 구현합니다
        // 실제 프로덕션에서는 데이터베이스에서 사용자를 확인해야 합니다
        if (credentials.email === "demo@mbti.com" && credentials.password === "demo123") {
          return {
            id: "1",
            email: "demo@mbti.com",
            name: "데모 사용자",
            image: null,
          }
        }

        // 새로운 사용자 등록 (데모용)
        return {
          id: Date.now().toString(),
          email: credentials.email as string,
          name: credentials.email?.split('@')[0] || "새 사용자",
          image: null,
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    }
  },
  session: {
    strategy: "jwt",
  },
})