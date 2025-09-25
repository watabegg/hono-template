import { desc, eq, count } from 'drizzle-orm'
import { articles } from '@/db/schema'
import type { DbClient } from '@/db'

export async function listArticles(db: DbClient) {
  return db
    .select()
    .from(articles)
    .orderBy(desc(articles.createdAt))
}

export async function getArticleById(db: DbClient, id: string) {
  return db
    .select()
    .from(articles)
    .where(eq(articles.id, id))
    .limit(1)
    .then((rows) => (rows.length === 0 ? null : rows[0]))
}

export async function createArticle(
  db: DbClient,
  id: string,
  userId: string,
  title: string,
  content: string
) {
  const now = new Date()
  await db.insert(articles).values({
    id,
    userId,
    title,
    content,
    createdAt: now,
    updatedAt: now,
  })
}

export async function updateArticle(
  db: DbClient,
  id: string,
  title: string,
  content: string
) {
  await db
    .update(articles)
    .set({ title, content, updatedAt: new Date() })
    .where(eq(articles.id, id))
}

export async function deleteArticle(db: DbClient, id: string) {
  await db.delete(articles).where(eq(articles.id, id))
}

export async function countArticles(db: DbClient) {
  const result = await db
    .select({ count: count() })
    .from(articles)
    .then((rows) => (rows.length === 0 ? { count: 0 } : rows[0]))
  return Number(result.count)
}

export async function listArticlesByUserId(
  db: DbClient,
  userId: string,
) {
  return db
    .select()
    .from(articles)
    .where(eq(articles.userId, userId))
    .orderBy(desc(articles.createdAt))
}
