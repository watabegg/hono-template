import type { DbClient } from "@/db";
import { defineRouteHandler } from '@/lib/openapi'
import {
	created,
	forbidden,
	internalError,
	noContent,
	notFound,
	ok,
	unauthorized,
} from '@/lib/http/responses'
import { requireSessionUser } from '@/lib/auth'
import type { Article } from "./types";
import * as service from './service'
import type * as route from './openapi'

export const listArticles = defineRouteHandler<
  typeof route.listArticles
>(async (c) => {
  const articles = await service.listArticles(c.var.db)
  return ok(c, articles)
})

export const getArticleById = defineRouteHandler<
  typeof route.getArticleById
>(async (c) => {
  const { articleId } = c.req.valid('param')
  const article = await service.getArticleById(c.var.db, articleId)
  if (!article) return notFound(c, 'Not Found')
  return ok(c, article)
})

export const createArticle = defineRouteHandler<
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
  try {
    await service.createArticle(c.var.db, id, body.title, body.content, sessionUser.user.id)
    return created(c, null)
  } catch (error) {
    return internalError(c, error instanceof Error ? error.message : 'Failed to create article')
  }
})

export const updateArticle = defineRouteHandler<
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
  try {
    await service.updateArticle(c.var.db, articleId, body.title!, body.content!)
    return noContent(c)
  } catch (error) {
    return internalError(c, error instanceof Error ? error.message : 'Failed to update article')
  }
})

export const deleteArticle = defineRouteHandler<
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
  try {
    await service.deleteArticle(c.var.db, articleId)
    return noContent(c)
  } catch (error) {
    return internalError(c, error instanceof Error ? error.message : 'Failed to delete article')
  }
})