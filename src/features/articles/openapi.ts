import { createRoute } from '@hono/zod-openapi'
import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/lib/http/status'
import { registerFeatureTag } from '@/lib/openapi/tags'
import * as schema from './schema'

export const ARTICLES_TAG = registerFeatureTag({
  name: 'Articles',
  description: '記事の作成・取得・更新・削除を扱うAPI。',
})

export const listArticles = createRoute({
  tags: [ARTICLES_TAG.name],
  method: 'get',
  path: '/',
  summary: '記事一覧取得',
  operationId: 'listArticles',
  responses: {
    [HTTP_STATUS.OK]: {
      description: HTTP_STATUS_MESSAGE[HTTP_STATUS.OK],
      content: {
        'application/json': { schema: schema.ArticleResponseSchema },
      },
    },
  },
})

export const getArticleById = createRoute({
  tags: [ARTICLES_TAG.name],
  method: 'get',
  path: '/{articleId}',
  summary: '記事取得',
  operationId: 'getArticleById',
  request: {
    params: schema.ArticleIdParam,
  },
  responses: {
    [HTTP_STATUS.OK]: {
      description: HTTP_STATUS_MESSAGE[HTTP_STATUS.OK],
      content: {
        'application/json': { schema: schema.ArticleDetailResponseSchema },
      },
    },
    [HTTP_STATUS.NOT_FOUND]: {
      description: HTTP_STATUS_MESSAGE[HTTP_STATUS.NOT_FOUND],
    },
  },
})

export const createArticle = createRoute({
  tags: [ARTICLES_TAG.name],
  method: 'post',
  path: '/',
  summary: '記事作成',
  operationId: 'createArticle',
  request: {
    body: {
      content: {
        'application/json': { schema: schema.ArticleCreateSchema },
      },
    },
  },
  responses: {
    [HTTP_STATUS.CREATED]: {
      description: HTTP_STATUS_MESSAGE[HTTP_STATUS.CREATED],
      content: {
        'application/json': { schema: schema.ArticleDetailResponseSchema },
      },
    },
    [HTTP_STATUS.FORBIDDEN]: {
      description: HTTP_STATUS_MESSAGE[HTTP_STATUS.FORBIDDEN],
    },
    [HTTP_STATUS.INTERNAL_SERVER_ERROR]: {
      description: HTTP_STATUS_MESSAGE[HTTP_STATUS.INTERNAL_SERVER_ERROR],
      content: {
        'application/json': { schema: schema.ArticleErrorResponseSchema },
      },
    },
  },
})


export const updateArticleById = createRoute({
  tags: [ARTICLES_TAG.name],
  method: 'put',
  path: '/{articleId}',
  summary: '記事更新',
  operationId: 'updateArticleById',
  request: {
    params: schema.ArticleIdParam,
    body: {
      content: {
        'application/json': { schema: schema.ArticleUpdateSchema },
      },
    },
  },
  responses: {
    [HTTP_STATUS.OK]: {
      description: HTTP_STATUS_MESSAGE[HTTP_STATUS.OK],
      content: {
        'application/json': { schema: schema.ArticleDetailResponseSchema },
      },
    },
    [HTTP_STATUS.FORBIDDEN]: {
      description: HTTP_STATUS_MESSAGE[HTTP_STATUS.FORBIDDEN],
    },
    [HTTP_STATUS.NOT_FOUND]: {
      description: HTTP_STATUS_MESSAGE[HTTP_STATUS.NOT_FOUND],
    },
    [HTTP_STATUS.INTERNAL_SERVER_ERROR]: {
      description: HTTP_STATUS_MESSAGE[HTTP_STATUS.INTERNAL_SERVER_ERROR],
      content: {
        'application/json': { schema: schema.ArticleErrorResponseSchema },
      },
    },
  },
})

export const deleteArticleById = createRoute({
  tags: [ARTICLES_TAG.name],
  method: 'delete',
  path: '/{articleId}',
  summary: '記事削除',
  operationId: 'deleteArticleById',
  request: {
    params: schema.ArticleIdParam,
  },
  responses: {
    [HTTP_STATUS.NO_CONTENT]: {
      description: HTTP_STATUS_MESSAGE[HTTP_STATUS.NO_CONTENT],
    },
    [HTTP_STATUS.FORBIDDEN]: {
      description: HTTP_STATUS_MESSAGE[HTTP_STATUS.FORBIDDEN],
    },
    [HTTP_STATUS.NOT_FOUND]: {
      description: HTTP_STATUS_MESSAGE[HTTP_STATUS.NOT_FOUND],
    },
    [HTTP_STATUS.INTERNAL_SERVER_ERROR]: {
      description: HTTP_STATUS_MESSAGE[HTTP_STATUS.INTERNAL_SERVER_ERROR],
      content: {
        'application/json': { schema: schema.ArticleErrorResponseSchema },
      },
    },
  },
})
