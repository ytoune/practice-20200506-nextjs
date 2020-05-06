import { remove } from 'fs-extra'
import { join } from 'path'

remove(join(__dirname, '..', 'out')).catch(x => {
	console.error(x)
	process.exit(1)
})

remove(join(__dirname, '..', '.next')).catch(x => {
	console.error(x)
	process.exit(1)
})
