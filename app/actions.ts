"use server";

import { db } from "@/db";
import { blogLikes, blogs, InsertBlogs, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { User } from "next-auth";
import { revalidatePath } from "next/cache";

export async function publishBlog(
	blog: Omit<InsertBlogs, "userId">,
	email: string
) {
	const [user] = await db.select().from(users).where(eq(users.email, email));

	await db
		.insert(blogs)
		.values({
			id: blog.id,
			title: blog.title,
			content: blog.content,
			description: blog.description,
			userId: user.id,
			status: "published",
			metadata: blog.metadata,
		})
		.onConflictDoUpdate({
			target: blogs.id,
			set: {
				title: blog.title,
				content: blog.content,
				description: blog.description,
				status: "published",
				metadata: blog.metadata,
				updatedAt: new Date(),
			},
		});

	revalidatePath("/blogs");
}

export async function saveBlogAsDraft(
	blog: Omit<InsertBlogs, "userId">,
	email: string
) {
	const [user] = await db.select().from(users).where(eq(users.email, email));

	await db
		.insert(blogs)
		.values({
			id: blog.id,
			title: blog.title,
			content: blog.content,
			description: blog.description,
			userId: user.id,
			status: "draft",
		})
		.onConflictDoUpdate({
			target: blogs.id,
			set: {
				title: blog.title,
				content: blog.content,
				description: blog.description,
				status: "draft",
				updatedAt: new Date(),
			},
		});

	revalidatePath("/blogs/drafts");
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

export async function deleteBlogById(id: number) {
	await db.delete(blogs).where(eq(blogs.id, id));
	revalidatePath("/blogs/drafts");
}

export async function likeBlogById(blogId: number, email: string) {
	const user = await db
		.select({ id: users.id })
		.from(users)
		.where(eq(users.email, email));

	if (!user[0].id) return;

	await db.insert(blogLikes).values({
		blogId,
		userId: user[0].id,
	});

	revalidatePath(`/blog/${blogId}`);
}
