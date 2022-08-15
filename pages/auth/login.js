import { getProviders, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

function Login({ providers }) {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className='h-screen bg-black flex flex-col items-center pt-40 space-y-8'>
      <Head>
        <title>Login - Spotify</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Image
        src='https://rb.gy/y9mwtb'
        width={600}
        height={250}
        objectFit='contain'
        animate-pulse='true'
        alt='logo'
        className='animate-pulse'
        priority='true'
      />

      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button
            className='text-white py-4 px-6 rounded-full bg-[#1db954] transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#0db146]'
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers }
  }
}

/* 

For the login page: 
  1) First we need to do an SSR Server Side Render to get all off the providers that we have configured in our next-auth.js file.
  2) Before the page loads, it needs to render on the server. 
  3) We do that by using the getServerSideProps function.  This will run on the server before the page gets delivered everytime this is called on the client side.
  4) Anytime a user goes to the login page, we want to make sure we get the latest providers that we have configured in our next-auth.js file.  So we need to do an SSR.
      ** const providers = await getProviders() will do that. 
      ** We'll need to import {getProviders, signIn} from next-auth/client. We need these two functions in order to do that. 
      ** {getProviders()} method returns the list of providers currently configured for signIn. It calls /api/auth/providers and returns a list of the currently configured Authentication providers. 
      ** return : whenever we do a serverside render we need to return something. We'll need to return an object with the props inside of it. In react we can access our props at the functional component level.  So we'll need to pass the providers as props to our login component. So the props will come through as props.  When it renders on the server i want to pass back the providers that we have configured. we can destructure our provider props at the functional component level. 

    5) We'll need to create a button but with that button we'll need to MAP over the providers.  We can do with a jsx block of code. {Object.values(providers).map((provider) => )}

    ** what this does is goes through the providers array that came back and it gives us the value for each provider. 

<button className='text-white bg-[#1db954] py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest border border-transparent shadow-md shadow-green-200 transition duration-300 ease-out md:text-base hover:scale-110 hover:bg-[#0db11b]'>
        Sign In With
      
*/
