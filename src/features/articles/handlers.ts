import { handler } from '@/lib/openapi'
import {
	created,
	forbidden,
	noContent,
	notFound,
	ok,
} from '@/lib/http/responses'
import { requireSessionUser } from '@/lib/auth'
import * as service from './service'
import type * as route from './openapi'

export const listArticles = handler<
  typeof route.listArticles
>(async (c) => {
  const articles = await service.listArticles(c.var.db)
  return ok(c, articles)
})

export const getArticleById = handler<
  typeof route.getArticleById
>(async (c) => {
  const { articleId } = c.req.valid('param')
  const article = await service.getArticleById(c.var.db, articleId)
  if (!article) return notFound(c, 'Not Found')
  return ok(c, article)
})

export const createArticle = handler<
  typeof route.createArticle
>(async (c) => {
  const body = c.req.valid('json')
  const guard = requireSessionUser(c)
  if (!guard.ok) return guard.response
  const sessionUser = guard.user
  if (!sessionUser.user?.id) {
    return forbidden(c, 'Forbidden')
  }
  const id = crypto.randomUUID()
  await service.createArticle(c.var.db, id, body.title, body.content, sessionUser.user.id)
  return created(c, null)

})

export const updateArticle = handler<
  typeof route.updateArticleById
>(async (c) => {
  const { articleId } = c.req.valid('param')
  const body = c.req.valid('json')
  const guard = requireSessionUser(c)
  if (!guard.ok) return guard.response
  const sessionUser = guard.user
  if (!sessionUser.user?.id) {
    return forbidden(c, 'Forbidden')
  }
  const article = await service.getArticleById(c.var.db, articleId)
  if (!article) return notFound(c, 'Not Found')
  if (article.userId !== sessionUser.user.id) {
    return forbidden(c, 'Forbidden')
  }
  await service.updateArticle(c.var.db, articleId, body.title!, body.content!)
  return noContent(c)

})

export const deleteArticle = handler<
  typeof route.deleteArticleById
>(async (c) => {
  const { articleId } = c.req.valid('param')
  const guard = requireSessionUser(c)
  if (!guard.ok) return guard.response
  const sessionUser = guard.user
  if (!sessionUser.user?.id) {
    return forbidden(c, 'Forbidden')
  }
  const article = await service.getArticleById(c.var.db, articleId)
  if (!article) return notFound(c, 'Not Found')
  if (article.userId !== sessionUser.user.id) {
    return forbidden(c, 'Forbidden')
  }
  await service.deleteArticle(c.var.db, articleId)
  return noContent(c)
})