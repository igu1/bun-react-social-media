import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { database } from '../db/db';
import { userTable } from '../db/schemas/user';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import crypto from 'crypto';
import { createMiddleware } from 'hono/factory';

const app = new Hono();

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    uid: z.string(),
    email: z.string().email(),
    password: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
});

export const createUserSchema = userSchema.omit({ createdAt: true, updatedAt: true, id: true, uid: true });

// Middleware for error handling
app.use('*', async (c, next) => {
    try {
        await next();
    } catch (err) {
        console.error(err);
        throw err;
    }
});

// Authentication middleware
const authMiddleware = createMiddleware(async (c, next) => {
    const token = getCookie(c, 'token');
    if (!token) {
        return c.text('Unauthorized', 401);
    }
    const user = await database.select().from(userTable).where(eq(userTable.uid, token)).then(res => res[0]);
    if (!user) {
        return c.text('Unauthorized', 401);
    }
    c.set('user', user);
    await next();
});

// Function to hash passwords using crypto
const hashPassword = (password: string) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

// Function to compare passwords
const comparePassword = (inputPassword: string, storedPassword: string) => {
    const hashedInputPassword = inputPassword;
    return hashedInputPassword === storedPassword;
};

export const authRoute = new Hono()
    .get('/login', (c) => c.redirect('/login'))
    .post('/login', zValidator('json', loginSchema), async (c) => {
        const body = c.req.valid('json');
        const data = await database.select().from(userTable).where(eq(userTable.email, body.email)).then(res => res[0]);
        if (!data || !comparePassword(body.password, data.password as string)) {
            return c.text('Invalid Credentials', 401);
        }
        setCookie(c, 'token', data.uid, { path: '/', httpOnly: true, secure: true });
        return c.json({ data, status: 'success' });
    })
    .get('/logout', (c) => {
        deleteCookie(c, 'token');
        return c.text('Logged out', 200);
    })
    .get('/signup', (c) => c.redirect('/signup'))
    .post('/signup', zValidator('json', createUserSchema), async (c) => {
        const body = c.req.valid('json');
        // body.password = hashPassword(body.password);
        const user = { ...body, uid: uuidv4() };
        await database.insert(userTable).values(user);
        c.status(201);
        return c.json({ data: user, status: 'success' });
    })
    .get('/me', authMiddleware, async (c) => {
        const user = getCookie(c, 'token');
        if (!user) {
            return c.text('Unauthorized', 401);
        }
        const data = await database.select().from(userTable).where(eq(userTable.uid, user)).then(res => res[0]);
        if (!data) {
            return c.text('Unauthorized', 401);
        }
        c.status(200);
        return c.json({ data: data, status: 'success' });
    });

app.route('/auth', authRoute);

export default app;
