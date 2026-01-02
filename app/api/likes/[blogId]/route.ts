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

	if (!email) {
		return NextResponse.json({ error: "Email is required" }, { status: 400 });
	}

	const user = await db
		.select({ id: users.id })
		.from(users)
		.where(eq(users.email, email!));

	if (!user || user.length === 0) {
		return NextResponse.json({ error: "User not found" }, { status: 400 });
	}

	const result = await db
		.select({ userId: blogLikes.userId, blogId: blogLikes.blogId })
		.from(blogLikes)
		.where(
			and(eq(blogLikes.blogId, +blogId), eq(blogLikes.userId, user[0].id))
		);

	return NextResponse.json(result);
}
