import type { AuthConfig } from '@auth/core'
import type { DbClient } from '@/db'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import type { Bindings } from '@/config/env'

export const createAuthConfig = (db: DbClient, env: Bindings): AuthConfig => ({
	adapter: DrizzleAdapter(db),
	debug: env.APP_ENV !== 'production',
	trustHost: true,
	session: {
		strategy: 'jwt',
	},
	providers: [],
})
