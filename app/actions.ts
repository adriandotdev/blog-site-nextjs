"use server";

import { db } from "@/db";
import { blogs, InsertBlogs, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { User } from "next-auth";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export async function getBlogs(email: string, status: string) {
	console.log(email);
	const userBlogs = await db
		.select()
		.from(blogs)
		.leftJoin(users, eq(blogs.userId, users.id))
		.where(and(eq(users.email, email), eq(blogs.status, status)));

	return userBlogs;
}

export async function publishBlog(
	blog: Omit<InsertBlogs, "userId">,
	email: string
) {
	const [user] = await db.select().from(users).where(eq(users.email, email));

	await db.insert(blogs).values({
		title: blog.title,
		content: blog.content,
		description: blog.description,
		userId: user.id,
		status: "published",
	});

	revalidatePath("/blogs");

	redirect("/blogs");
}

export async function getBlogById(id: number) {
	const blog = await db.select().from(blogs).where(eq(blogs.id, id));

	if (blog.length === 0) notFound();

	return blog[0];
}

export async function existingUser(email: string) {
	const [existingUser] = await db
		.select()
		.from(users)
		.where(eq(users.email, email));

	return existingUser;
}

export async function insertNewUser(user: User) {
	await db.insert(users).values({
		email: user.email ?? "",
		name: user.name ?? "",
		password: "",
	});
}
