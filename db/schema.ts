import {
	integer,
	jsonb,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

export const visibilityEnum = pgEnum("visibility", ["public", "private"]);

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	password: text("password"),
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
	visibility: visibilityEnum("visibility").default("public"),
	metadata: jsonb(),
});

export const blogLikes = pgTable("blog_likes", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	blogId: integer("blog_id")
		.notNull()
		.references(() => blogs.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").defaultNow(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertBlogs = typeof blogs.$inferInsert;
export type SelectBlogs = typeof blogs.$inferSelect;

export type BlogWithUser = SelectBlogs & {
	user: SelectUser;
};
