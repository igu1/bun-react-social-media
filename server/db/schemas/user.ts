import { serial, text, pgTable, pgSchema, timestamp, index } from "drizzle-orm/pg-core";

export const userTable = pgTable('users', {
    id: serial('id').primaryKey(),
    uid: text('uid').notNull(),
    name: text('name'),
    email: text('email').unique().notNull(),
    password: text('password'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (users) => {
    return {
        userEmailIndex: index('user_email_idx').on(users.email),
    }
})



