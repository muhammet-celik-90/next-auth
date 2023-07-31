import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Email',
            async authorize(credentials) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                /* const res = await fetch("/your/endpoint", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json() */

                const user = {id:1, email:"mhmmt_clk@live.com", name:"Muhammet", password:"123456"}

                // If no error and we have user data, return it
                if (credentials.email === user.email && credentials.password === user.password) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }