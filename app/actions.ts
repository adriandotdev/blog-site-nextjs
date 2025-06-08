"use server";

import { db } from "@/db";
import { blogs, InsertBlogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export async function getBlogs() {
	const userBlogs = await db.select().from(blogs);

	return userBlogs;
}

export async function publishBlog(blog: InsertBlogs) {
	await db.insert(blogs).values({
		title: blog.title,
		content: blog.content,
		description: blog.description,
		userId: blog.userId,
	});

	revalidatePath("/blogs");

	redirect("/blogs");
}

export async function getBlogById(id: number) {
	const blog = await db.select().from(blogs).where(eq(blogs.id, id));

	if (blog.length === 0) notFound();

	return blog[0];
}
