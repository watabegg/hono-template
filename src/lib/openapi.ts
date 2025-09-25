import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import type {
	RouteConfig,
	RouteHandler as ZodRouteHandler,
} from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import type Env from '@/config/env'
import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from '@/lib/http/status'
import { listRegisteredTags, registerFeatureTag } from '@/lib/openapi/tags'

type AppBindings = Env['Bindings']
type AppVariables = Env['Variables']

export type AppEnv = { Bindings: AppBindings; Variables: AppVariables }
export type AppOpenAPI = OpenAPIHono<AppEnv>

type CreateAppOptions = {
	tags?: { name: string; description?: string }[]
}

// newApp: OpenAPI対応のHonoアプリを生成
export const newApp = (options: CreateAppOptions = {}): AppOpenAPI => {
	const app = new OpenAPIHono<AppEnv>()

	options.tags?.forEach(registerFeatureTag)

	app.openAPIRegistry.registerComponent(
		'securitySchemes',
		'SessionCookie',
		{
			type: 'apiKey',
			in: 'cookie',
			name: 'authjs.session-token',
			description: 'Auth.js のJWTセッション用Cookie。',
		},
	)

	return app
}

export const registerApiDocs = (
	app: AppOpenAPI,
) => {

	app.doc('/openapi.json', {
		openapi: '3.1.0',
		info: {
			title: 'Sample API',
			description: 'APIドキュメント',
			version: '1.0.0',
		},
		tags: listRegisteredTags(),
	})

	app.get('/docs', swaggerUI({ url: '/openapi.json' }))
}

export const createResponseSchema = <T extends ReturnType<typeof z.any>>(
	schema: T,
	name?: string,
) => (name ? schema.openapi(name) : schema)

export const ErrorResponseSchema = z
	.object({ error: z.string() })
	.openapi('ErrorResponse')

export const DEFAULT_UNAUTHORIZED_RESPONSE = {
	description: HTTP_STATUS_MESSAGE[HTTP_STATUS.UNAUTHORIZED],
	content: {
		'application/json': {
			schema: ErrorResponseSchema,
		},
	},
} as const

type RouteConfigType = Parameters<typeof createRoute>[0]

export const createAuthenticatedRoute = <const R extends RouteConfigType>(
	config: R,
) =>
	createRoute({
		...config,
		security: config.security,
		responses: {
			...config.responses,
			[HTTP_STATUS.UNAUTHORIZED]:
				config.responses?.[HTTP_STATUS.UNAUTHORIZED] ??
				DEFAULT_UNAUTHORIZED_RESPONSE,
		},
	} satisfies RouteConfigType)

export type AppRouteHandler<R extends RouteConfig> = ZodRouteHandler<R, AppEnv>

export const defineRouteHandler = <R extends RouteConfig>(
	handler: AppRouteHandler<R>,
) => handler
