import type { Context, Next } from 'hono'
import { getDbClient } from '@/db'
import type { Bindings, Variables } from '@/config/env'

export const dbMiddleware = () => {
	return async (
		c: Context<{ Bindings: Bindings; Variables: Variables }>,
		next: Next,
	) => {
		const db = getDbClient(c.env)
		c.set('db', db)
		await next()
	}
}
