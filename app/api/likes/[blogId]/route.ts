import { db } from "@/db";
import { blogLikes, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ blogId: string }> }
) {
	const searchParams = await request.nextUrl.searchParams;
	const { blogId } = await params;

	const email = searchParams.get("email");

	const user = await db
		.select({ id: users.id })
		.from(users)
		.where(eq(users.email, email!));

	const result = await db
		.select({ userId: blogLikes.userId, blogId: blogLikes.blogId })
		.from(blogLikes)
		.where(
			and(eq(blogLikes.blogId, +blogId), eq(blogLikes.userId, user[0].id))
		);

	return NextResponse.json(result);
}
