import { newApp } from '@/lib/openapi'
import * as h from './handlers'
import * as r from './openapi'

const app = newApp({ tags: [r.ARTICLES_TAG] })

app.openapi(r.listArticles, h.listArticles)
app.openapi(r.getArticleById, h.getArticleById)
app.openapi(r.createArticle, h.createArticle)
app.openapi(r.updateArticleById, h.updateArticle)
app.openapi(r.deleteArticleById, h.deleteArticle)

export default app