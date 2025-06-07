"use server";

import { db } from "@/db";
import { blogs, users } from "@/db/schema";

export async function createUser() {
	await db.insert(users).values({
		name: "Adrian",
		email: "nads@gigrewards.ph",
		password: "password",
	});
}

export async function getBlogs() {
	await new Promise((resolve) => setTimeout(resolve, 3000));
	const userBlogs = await db.select().from(blogs);

	return userBlogs;
}
