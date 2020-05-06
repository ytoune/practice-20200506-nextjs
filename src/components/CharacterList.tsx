import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import type { Character } from '~/store'

const createUrl = (name: string) => {
	const u = new URL('https://www.google.co.jp/search?hl=ja&tbm=isch')
	u.searchParams.append('q', name)
	return u.toString()
}

const CharacterList = ({ characters }: { characters: Character[] }) => (
	<List>
		{characters.map(c => (
			<ListItem className="listitem" button key={c.name + '/' + c.product}>
				<ListItemAvatar>
					<>{c.birthday}</>
				</ListItemAvatar>
				<ListItemText primary={c.name} secondary={c.product} />
				<ListItemSecondaryAction>
					<a
						href={createUrl(c.name + ' ' + c.product)}
						target="_blank"
						rel="noopener noreferrer"
					>
						画像検索
					</a>
				</ListItemSecondaryAction>
			</ListItem>
		))}
	</List>
)

export default CharacterList
