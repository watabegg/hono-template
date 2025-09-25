import type { AuthUser } from '@hono/auth-js'
import type { DbClient } from '@/db'

export type SessionContextUser = {
	id: string
}

export type Bindings = {
	DATABASE_URL: string
	APP_ENV: string
}

export type Variables = {
	db: DbClient
	authUser: AuthUser | null
}

type Env = {
	Bindings: Bindings
	Variables: Variables
}

export default Env

export const getEnv = (env: Bindings) => ({
	databaseUrl: env.DATABASE_URL,
	appEnv: env.APP_ENV,
})
