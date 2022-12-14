import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
	
  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
       
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}