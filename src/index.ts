import { newApp, registerApiDocs } from '@/lib/openapi'
import { setupMiddleware } from '@/middleware/factory'
import articleRoutes from '@/features/articles/routes'

const app = setupMiddleware(newApp())

app.get('/', async (c) => {
	const user = c.get('authUser')
	return c.json({ message: 'Hello Hono!', user: user ?? null }, { status: 200 })
})

app.route('/articles', articleRoutes)

registerApiDocs(app)

export default app
