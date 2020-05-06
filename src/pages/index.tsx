import React from 'react'
import Button from '@material-ui/core/Button'

import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import { useData, useCharacters, useMonth, actions, useAction } from '~/store'
import CharacterList from '~/components/CharacterList'

const Home = () => {
	useData()
	const setMonth = useAction(actions.setMonth)
	const list = useCharacters()
	const month = useMonth()
	if (!list.length) {
		return (
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
	}
	return (
		<div>
			<div>
				{Array.from({ length: 12 }, (_, n) => 1 + n).map(m => (
					<Button
						onClick={() => setMonth(m)}
						variant={month === m ? 'contained' : 'outlined'}
						color={month === m ? 'primary' : undefined}
						key={m}
					>
						{m} 月
					</Button>
				))}
			</div>
			{!month ? (
				<Alert severity="info">select month</Alert>
			) : (
				<CharacterList characters={list} />
			)}
			<style jsx>{`
				.listitem {
					font-family: sans-serif, system-ui;
				}
			`}</style>
		</div>
	)
}

export default Home
