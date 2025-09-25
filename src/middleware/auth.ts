import { createMiddleware } from 'hono/factory'
import { getAuthUser } from '@hono/auth-js'
import type { Bindings, Variables } from '@/config/env'

export const authSessionMiddleware = () =>
	createMiddleware<{ Bindings: Bindings; Variables: Variables }>(
		async (c, next) => {
			const authUser = await getAuthUser(c)
			c.set('authUser', authUser ?? null)
			await next()
		},
	)
