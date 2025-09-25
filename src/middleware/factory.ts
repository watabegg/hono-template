import type { AppOpenAPI } from '@/lib/openapi'  
import { dbMiddleware } from './db'  
import { authSessionMiddleware } from './auth'  
import { errorHandlerMiddleware } from './errorHandler'  
import { initAuthConfig } from '@hono/auth-js'  
import { createAuthConfig } from '@/lib/auth/config'  
import { getDbClient } from '@/db'  
  
export const setupMiddleware = (app: AppOpenAPI) => {  
  app.use('*', errorHandlerMiddleware())  
    
  app.use('*', dbMiddleware())  
    
  app.use('*', initAuthConfig((c) => createAuthConfig(getDbClient(c.env), c.env)))  
  app.use('*', authSessionMiddleware())  
    
  return app  
}