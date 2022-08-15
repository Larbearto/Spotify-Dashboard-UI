import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Dashboard from '../components/Dashboard'

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {}
  })

  return (
    <div className=''>
      <Head>
        <title>Spotify - Dashboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Dashboard />
    </div>
  )
}
