import { Hono } from "hono";
import { logger } from 'hono/logger'
import { postRoute } from "./routes/posts";
import { serveStatic } from 'hono/bun'
import { authRoute } from "./routes/auth";

const app = new Hono();

app.use(logger())

const routes = app.basePath('/api')
    .route('/posts', postRoute)
    .route('/auth', authRoute)


app.get('*', serveStatic({root: './frontend/dist'}))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

export default app;
export type AppType = typeof routes;