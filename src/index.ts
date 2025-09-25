import { initAuthConfig } from '@hono/auth-js'
import { newApp, registerApiDocs } from '@/lib/openapi'
import { authSessionMiddleware } from '@/middleware/auth'
import { dbMiddleware } from '@/middleware/db'
import articleRoutes from '@/features/articles/routes'
import { createAuthConfig } from '@/lib/auth/config'
import { getDbClient } from '@/db'

const app = newApp()

app.use('*', dbMiddleware())

app.use(
	'*',
	initAuthConfig((c) => createAuthConfig(getDbClient(c.env), c.env)),
)

app.use('*', authSessionMiddleware())

app.get('/', async (c) => {
	const user = c.get('authUser')
	return c.json({ message: 'Hello Hono!', user: user ?? null }, { status: 200 })
})

// mount feature routes
app.route('/articles', articleRoutes)

registerApiDocs(app)

export default app
