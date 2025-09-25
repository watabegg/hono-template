import * as repository from './repository'
import type { DbClient } from '@/db'
import type { Article } from './types'

export async function listArticles(db: DbClient) {
  const articles = await repository.listArticles(db)
  return articles.map(toArticleResponse)
}

export async function getArticleById(db: DbClient, id: string) {
  const article = await repository.getArticleById(db, id)
  if (!article) {
    return null
  }
  return toArticleResponse(article)
}

export async function createArticle(
  db: DbClient,
  id: string,
  userId: string,
  title: string,
  content: string
) {
  await repository.createArticle(db, id, userId, title, content)
}

export async function updateArticle(
  db: DbClient,
  id: string,
  title: string,
  content: string
) {
  await repository.updateArticle(db, id, title, content)
}

export async function deleteArticle(db: DbClient, id: string) {
  await repository.deleteArticle(db, id)
}

export function toArticleResponse(article: Article) {
  return {
    id: article.id,
    userId: article.userId,
    title: article.title,
    content: article.content,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  }
}