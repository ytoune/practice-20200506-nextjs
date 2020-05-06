import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '~/store'
import type { AppProps } from 'next/app'
import Head from 'next/head'

const App = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side')
		jssStyles?.parentElement?.removeChild(jssStyles)
	}, [])

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<title>anime characters birthdays</title>
				<meta
					name="viewport"
					content="minimum-scale=1,initial-scale=1,width=device-width"
				/>
				<meta name="description" content="誕生日別アニメキャラクター一覧" />
			</Head>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</>
	)
}

export default App
