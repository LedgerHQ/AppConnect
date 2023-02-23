import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import { connectWallet } from '@/services/wallet.service'

export default function Home() {

  const [isConnected, setConnected] = useState(false)

  let chain: string = "1234567890"
  let address: string = "0xdeadbabedeadbabe"

  async function handleConnectClick(s: string){ 
    console.log(s)
    const wallet = await connectWallet()
    console.log(wallet)
    setConnected(!!wallet?.isConnected)
  }

  return (
    <div className={styles.container}>
    <Head>
      <title>Fresh Test Dapp</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      {isConnected ? (
        <>
          <h3 style={{ margin: 0 }}>
            Wallet address: <code>{ address }</code>
          </h3>
          <h3 style={{ margin: 0 }}>
            Url: <code>{chain}</code>
          </h3>
        </>
      ) : (
        <>
          <button
            className={styles.connect}
            onClick={() => handleConnectClick("connect WebWallet")}
          >
            Connect Fresh Wallet
          </button>
          <p>First connect wallet to use dapp.</p>
        </>
      )}
    </main>
  </div>
  )
}
