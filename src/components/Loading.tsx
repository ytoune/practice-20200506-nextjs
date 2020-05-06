import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const Loading = () => (
	<div>
		<CircularProgress />
		<style jsx>{`
			div {
				padding: 20px;
				text-align: center;
			}
		`}</style>
	</div>
)

export default Loading
