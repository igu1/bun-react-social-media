import { createMiddleware } from "hono/factory";
import { userSchema } from '../routes/auth';


type Env = {
    variables: {
        user:  typeof userSchema
    }
}

export const authMiddleware = createMiddleware(async (c, next) => {
    if (!c.get("user")) {
        console.log("redirecting to login");
    }else{
        console.log("user is authenticated");
    }
    await next();
});
