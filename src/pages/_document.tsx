import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import ServerStyleSheets from '@material-ui/styles/ServerStyleSheets'

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="ja">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

MyDocument.getInitialProps = async ctx => {
	const sheets = new ServerStyleSheets()
	const originalRenderPage = ctx.renderPage

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: App => props => sheets.collect(<App {...props} />),
		})

	const initialProps = await Document.getInitialProps(ctx)

	return {
		...initialProps,
		styles: (
			<>
				{initialProps.styles}
				{sheets.getStyleElement()}
			</>
		),
	}
}
