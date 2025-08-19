import { db } from "@/db";
import { blogs, users } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const params = request.nextUrl.searchParams;

	const email = params.get("email");
	const status = params.get("status");

	const userBlogs = await db
		.select()
		.from(blogs)
		.leftJoin(users, eq(blogs.userId, users.id))
		.where(and(eq(users.email, email!), eq(blogs.status, status!)))
		.orderBy(desc(blogs.createdAt));

	return NextResponse.json(userBlogs);
}
