import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import SpotifyProvider from 'next-auth/providers/spotify'

import spotifyApi, { LOGIN_URL } from '../../../lib/spotify'

async function refreshAccessToken(token: JWT) {
  try {
    spotifyApi.setAccessToken(token.accessToken as string)
    spotifyApi.setRefreshToken(token.refreshToken as string)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // = 1 hour as 3600 returns from spotify API
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken
      // Replace if new one came back, else fall back to old refresh token
    }

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken // Fall back to old refresh token
    }
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}
// Configure one or more authentication providers
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      authorization: LOGIN_URL
    })
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    // https:/next-auth.js.org/tutorials/refresh-token-rotation
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at! * 1000 // milliseconds
        }
      }

      // CASE2: Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as Number)) {
        return token
      }

      // CASE3: Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.username = token.username
      return session
    }
  }
})
/*
  ** session or async session (optional) - A next-auth function that is called on every page load if a user is authenticated(after the jwt token received from the jwt callback is verified). It can be used to check if the access token has expired and return a refreshed access token. If it does not return a session object, the user will be signed out.

  ** With the JWT token obtained and verified, we're going to create a session object that will be used to create a cookie that will be sent to the client. This cookie will be used to authenticate the user on every page load. The session object will contain the user's username, access token, and refresh token. The access token will be used to make requests to the Spotify API, and the refresh token will be used to refresh the access token when it expires.

  ** 'session.user' This is what the user can see.  But the token, the user cannot see.   So we have to take the things we want from the token to the user because that token 
  ** But the token 'accessToken' from session.user.accessToken the user cannot see. So we have to allocate the things we want from the token to the user because that token is 'http' ONLY which means that our javascript from the client it can't read that cookie. Its a hidden cookie. 


  */
