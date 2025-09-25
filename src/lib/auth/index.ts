import { unauthorized } from '@/lib/http/responses'
import type { AuthUser } from '@hono/auth-js'
import type { AppContext } from '@/lib/types'

export type SessionGuardResult<T extends AuthUser = AuthUser> =
	| { ok: true; user: T }
	| { ok: false; response: Response }

export function getSessionUser(c: AppContext): AuthUser | null {
	const cached = c.get('authUser')
	return cached ?? null
}

export function requireSessionUser(
	c: AppContext,
	message = 'Unauthorized',
): SessionGuardResult {
	const user = getSessionUser(c)
	if (!user) {
		console.log('requireSessionUser: no user in session')
		return { ok: false, response: unauthorized(c, message) }
	}
	return { ok: true, user }
}