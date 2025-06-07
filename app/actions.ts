"use server";

import { db } from "@/db";
import { blogs, InsertBlogs, users } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser() {
	await db.insert(users).values({
		name: "Adrian",
		email: "nads@gigrewards.ph",
		password: "password",
	});
}

export async function getBlogs() {
	const userBlogs = await db.select().from(blogs);

	return userBlogs;
}

export async function publishBlog(blog: InsertBlogs) {
	await db.insert(blogs).values({
		title: blog.title,
		content: blog.content,
		userId: blog.userId,
	});

	revalidatePath("/blogs");

	redirect("/blogs");
}
