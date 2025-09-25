import type { articles } from '@/db/schema'
import type { InferSelectModel } from 'drizzle-orm'

export type Article = InferSelectModel<typeof articles>