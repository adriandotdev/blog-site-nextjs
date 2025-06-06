import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
});

export const blogs = pgTable("blogs", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	content: text("content").notNull(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertPost = typeof blogs.$inferInsert;
export type SelectPost = typeof blogs.$inferSelect;
