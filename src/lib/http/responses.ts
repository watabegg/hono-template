import type { AppContext } from '@/lib/types'

export const ok = <T>(c: AppContext, data: T) => c.json(data, 200)
export const created = <T>(c: AppContext, data: T) => c.json(data, 201)
export const noContent = (c: AppContext) => c.body(null, 204)
export const badRequest = (c: AppContext, message: string) =>
	c.json({ error: message }, 400)
export const unauthorized = (c: AppContext, message = 'Unauthorized') =>
	c.json({ error: message }, 401)
export const forbidden = (c: AppContext, message = 'Forbidden') =>
	c.json({ error: message }, 403)
export const notFound = (c: AppContext, message = 'Not Found') =>
	c.json({ error: message }, 404)
export const conflict = (c: AppContext, message: string) =>
	c.json({ error: message }, 409)
export const internalError = (
	c: AppContext,
	message = 'Internal Server Error',
) => c.json({ error: message }, 500)
