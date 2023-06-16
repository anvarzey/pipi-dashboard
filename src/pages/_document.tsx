import { Html, Head, Main, NextScript } from 'next/document'
import { ReactElement } from 'react'

export default function Document (): ReactElement {
  return (
    <Html lang='en'>
      <Head>
        <link rel='icon' href='/logo-pipi.png' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
