import type { Context } from 'hono'
import type Env from '@/config/env'
import type { SessionContextUser } from '@/config/env'

export type AppBindings = Env['Bindings']
export type AppVariables = Env['Variables']

export type AppContext<Path extends string = string> = Context<
	{
		Bindings: AppBindings
		Variables: AppVariables
	},
	Path
>

export type SessionUser = SessionContextUser
