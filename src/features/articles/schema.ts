import { z } from '@hono/zod-openapi'
import { createSelectSchema } from 'drizzle-zod'
import { articles as articlesTable } from '@/db/schema'

export const ArticleIdParamSchema = z.object({ articleId: z.string().uuid() })

export const ArticleIdParam = ArticleIdParamSchema.openapi({
  param: {
    name: 'articleId',
    in: 'path',
    description: '記事ID',
    required: true,
  },
  example: '2b7f8d58-39de-4c12-9c34-1234567890ab',
})

export const ArticleCreateSchema = z.object({
  title: z.string().min(2).max(100),
  content: z.string().min(10).max(10000),
  userId: z.string().uuid(),
})

export const PublicArticleSchema = createSelectSchema(articlesTable)
  .openapi({ title: 'PublicArticle' })

export const ArticleResponseSchema = z
  .array(PublicArticleSchema)
  .openapi({ title: 'ArticleResponse' })

export const ArticleDetailResponseSchema = PublicArticleSchema.openapi({
  title: 'ArticleDetailResponse',
})

export const ArticleUpdateSchema = z.object({
  title: z.string().min(2).max(100).optional(),
  content: z.string().min(10).max(10000).optional(),
})

export const ArticleErrorResponseSchema = z.object({
  message: z.string(),
}).openapi({ title: 'ArticleErrorResponse' })