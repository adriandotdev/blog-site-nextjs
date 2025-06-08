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
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
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

// import {
// 	boolean,
// 	integer,
// 	pgTable,
// 	primaryKey,
// 	serial,
// 	text,
// 	timestamp,
// } from "drizzle-orm/pg-core";
// import { drizzle } from "drizzle-orm/postgres-js";
// import type { AdapterAccountType } from "next-auth/adapters";
// import postgres from "postgres";

// const connectionString = process.env.DATABASE_URL!;
// const pool = postgres(connectionString, { max: 10 });

// export const db = drizzle(pool);

// export const users = pgTable("users", {
// 	id: text("id")
// 		.primaryKey()
// 		.$defaultFn(() => crypto.randomUUID()),
// 	name: text("name"),
// 	email: text("email").unique(),
// 	emailVerified: timestamp("emailVerified", { mode: "date" }),
// 	image: text("image"),
// });

// export const accounts = pgTable(
// 	"accounts",
// 	{
// 		userId: text("userId")
// 			.notNull()
// 			.references(() => users.id, { onDelete: "cascade" }),
// 		type: text("type").$type<AdapterAccountType>().notNull(),
// 		provider: text("provider").notNull(),
// 		providerAccountId: text("providerAccountId").notNull(),
// 		refresh_token: text("refresh_token"),
// 		access_token: text("access_token"),
// 		expires_at: integer("expires_at"),
// 		token_type: text("token_type"),
// 		scope: text("scope"),
// 		id_token: text("id_token"),
// 		session_state: text("session_state"),
// 	},
// 	(account) => [
// 		{
// 			compoundKey: primaryKey({
// 				columns: [account.provider, account.providerAccountId],
// 			}),
// 		},
// 	]
// );

// export const sessions = pgTable("sessions", {
// 	sessionToken: text("sessionToken").primaryKey(),
// 	userId: text("userId")
// 		.notNull()
// 		.references(() => users.id, { onDelete: "cascade" }),
// 	expires: timestamp("expires", { mode: "date" }).notNull(),
// });

// export const verificationTokens = pgTable(
// 	"verificationTokens",
// 	{
// 		identifier: text("identifier").notNull(),
// 		token: text("token").notNull(),
// 		expires: timestamp("expires", { mode: "date" }).notNull(),
// 	},
// 	(verificationToken) => [
// 		{
// 			compositePk: primaryKey({
// 				columns: [verificationToken.identifier, verificationToken.token],
// 			}),
// 		},
// 	]
// );

// export const authenticators = pgTable(
// 	"authenticators",
// 	{
// 		credentialID: text("credentialID").notNull().unique(),
// 		userId: text("userId")
// 			.notNull()
// 			.references(() => users.id, { onDelete: "cascade" }),
// 		providerAccountId: text("providerAccountId").notNull(),
// 		credentialPublicKey: text("credentialPublicKey").notNull(),
// 		counter: integer("counter").notNull(),
// 		credentialDeviceType: text("credentialDeviceType").notNull(),
// 		credentialBackedUp: boolean("credentialBackedUp").notNull(),
// 		transports: text("transports"),
// 	},
// 	(authenticator) => [
// 		{
// 			compositePK: primaryKey({
// 				columns: [authenticator.userId, authenticator.credentialID],
// 			}),
// 		},
// 	]
// );

// export const blogs = pgTable("blogs", {
// 	id: serial("id").primaryKey(),
// 	title: text("title").notNull(),
// 	description: text("description"),
// 	content: text("content").notNull(),
// 	userId: text("user_id")
// 		.notNull()
// 		.references(() => users.id, { onDelete: "cascade" }),
// 	createdAt: timestamp("created_at").notNull().defaultNow(),
// 	updatedAt: timestamp("updated_at")
// 		.defaultNow()
// 		.notNull()
// 		.$onUpdate(() => new Date()),
// });

// export type InsertBlogs = typeof blogs.$inferInsert;
// export type SelectBlogs = typeof blogs.$inferSelect;
