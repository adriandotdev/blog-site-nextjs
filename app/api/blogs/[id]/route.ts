import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;

	const blog = await db.select().from(blogs).where(eq(blogs.id, +id));

	if (blog.length === 0) notFound();

	return NextResponse.json(blog[0]);
}
