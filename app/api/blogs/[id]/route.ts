import { db } from "@/db";
import { blogs, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;

	const blog = await db
		.select({
			id: blogs.id,
			title: blogs.title,
			description: blogs.description,
			content: blogs.content,
			updatedAt: blogs.updatedAt,
			user: {
				id: users.id,
				name: users.name,
				email: users.email,
			},
		})
		.from(blogs)
		.innerJoin(users, eq(users.id, blogs.userId))
		.where(eq(blogs.id, +id));

	if (blog.length === 0) notFound();

	return NextResponse.json(blog[0]);
}
