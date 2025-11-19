import { pgTable, unique, text, varchar, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: text().primaryKey().notNull(),
	email: varchar({ length: 256 }).notNull(),
	password: text().notNull(),
	name: text(),
	role: varchar({ length: 50 }).default('student'),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);
