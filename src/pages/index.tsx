import React from 'react'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import { useData, useCharacters, useMonth, actions, useAction } from '~/store'
import CharacterList from '~/components/CharacterList'
import Loading from '~/components/Loading'

const Home = () => {
	useData()
	const setMonth = useAction(actions.setMonth)
	const list = useCharacters()
	const month = useMonth()
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
			) : list.length ? (
				<CharacterList characters={list} />
			) : (
				<Loading />
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
