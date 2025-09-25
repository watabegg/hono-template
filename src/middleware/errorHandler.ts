import { internalError } from '@/lib/http/responses'  
import type { AppContext } from '@/lib/types'  
  
export const errorHandlerMiddleware = () => {  
  return async (c: AppContext, next: () => Promise<void>) => {  
    try {  
      await next()  
    } catch (error) {  
      console.error('Unhandled error:', error)  
      return internalError(  
        c,   
        error instanceof Error ? error.message : 'Internal Server Error'  
      )  
    }  
  }  
}