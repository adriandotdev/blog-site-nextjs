"use server";

import { db } from "@/db";
import { users } from "@/db/schema";

export async function createUser() {
	await db.insert(users).values({
		name: "Adrian",
		email: "nads@gigrewards.ph",
		password: "password",
	});
}
