import { combineReducers, createStore } from '@reduxjs/toolkit'
import { createAction, createSlice } from '@reduxjs/toolkit'
import { useSelector as origUseSelector, useDispatch } from 'react-redux'
import { useCallback, useEffect } from 'react'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export type Character = {
	name: string
	product: string
	birthday: string
	guildname?: string
	logo?: string
}

export type Data = {
	characters: Character[]
}

const order = (q: Character, w: Character) =>
	q.birthday.localeCompare(w.birthday, [], { numeric: true }) ||
	q.name.localeCompare(w.name, [], { numeric: true }) ||
	q.product.localeCompare(w.product, [], { numeric: true })

let gotflag = false
const getdata = () =>
	new Observable<Data>(s => {
		import('../data.json').then((d: Data) => {
			if (gotflag) return
			gotflag = true
			s.next(d)
		})
	}).pipe(map(d => patch(d)))

export const useData = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(start())
		const s = getdata().subscribe(a => dispatch(a))
		return () => s.unsubscribe()
	}, [])
}

const start = createAction('START')
const patch = createAction('PATCH', (d: Data) => ({ payload: d }))
const setMonth = createAction('SET_MONTH', (month: number | null) => ({
	payload: month,
}))
export const actions = {
	start,
	patch,
	setMonth,
}

const month = createSlice({
	name: 'month',
	initialState: null as null | number,
	reducers: {},
	extraReducers: builder =>
		builder.addCase(setMonth, (state, { payload: month }) => month),
})

const characters = createSlice({
	name: 'characters',
	initialState: {
		isPending: false,
		list: [] as Character[],
	},
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(start, state => ({ ...state, isPending: true, list: [] }))
			.addCase(patch, (state, action) => ({
				...state,
				isPending: false,
				list: action.payload.characters.slice().sort(order),
			})),
})

const filteredList = (list: Character[], month: null | number) =>
	list.filter(c => !month || c.birthday.startsWith(month + '/'))

const reducer = combineReducers({
	month: month.reducer,
	characters: characters.reducer,
})

export type State = ReturnType<typeof reducer>

export const store = createStore(reducer)

export const useSelector = <TSelected>(
	selector: (state: State) => TSelected,
	equalityFn?: (left: TSelected, right: TSelected) => boolean,
) => origUseSelector(selector, equalityFn)

export const useCharacters = () =>
	useSelector(state => filteredList(state.characters.list, state.month))

export const useMonth = () => useSelector(state => state.month)

export const useAction = <A extends unknown[]>(fn: (...a: A) => unknown) => {
	const d = useDispatch()
	return useCallback((...a: A) => d(fn(...a)), [d, fn])
}
