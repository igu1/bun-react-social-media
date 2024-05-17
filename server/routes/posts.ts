import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator'
import { authMiddleware } from '../middleware/authMiddleware';

const postSchema = z.object(
    {
        id: z.number(),
        title: z.string().max(100),
        description: z.string(),
        author: z.string()
    }
)

const createPostSchema = postSchema.omit({id: true})

type Post = z.infer<typeof postSchema>; 

const fakePosts : Post[] = [
    {
        id: 1,
        title: "My First Day",
        description: "This is a fun sample description. It has two sentences.",
        author: "Eesa"
    },
]

export const postRoute = new Hono()
    .get('', (c) => {
        return c.json(
            {
                expences: fakePosts
            }
        )
    })
    .get(':id{[0-9]+}/', (c) => {
        const post_id = c.req.param("id");
        const post = fakePosts.find((p) => p.id === parseInt(post_id));
        if (post) {
            return c.json(post);
        } else {
            return c.notFound()
        }
    })

    .post('', zValidator('json', createPostSchema), async (c) => {
        const body = await c.req.valid('json');
        fakePosts.push({...body, id: fakePosts.length + 1});
        c.status(201)
        return c.json({
            'data': body,
            'status': "Created"
        }, 201);
    })
    .get('/total_posts', (c) => {
        return c.json({
            post_count: fakePosts.length
        })
    })