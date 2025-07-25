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
	description: text("description"),
	content: text("content").notNull(),
	userId: integer("user_id").references(() => users.id, {
		onDelete: "cascade",
	}),
	status: text("status").notNull().default("published"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date()),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertBlogs = typeof blogs.$inferInsert;
export type SelectBlogs = typeof blogs.$inferSelect;
