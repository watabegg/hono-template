import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'
import type { Bindings } from '@/config/env'

// シングルトン保持用
let dbClient: ReturnType<typeof drizzle> | null = null

export const getDbClient = (env: Bindings) => {
	if (dbClient) return dbClient

	if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not defined')

	const sql = neon(env.DATABASE_URL)
	dbClient = drizzle(sql, { schema })
	return dbClient
}

export type DbClient = ReturnType<typeof getDbClient>
