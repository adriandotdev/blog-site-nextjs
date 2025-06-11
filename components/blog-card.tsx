"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SelectBlogs } from "@/db/schema";
import { truncate } from "lodash";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";

export default function BlogCard({ blog }: { blog: SelectBlogs }) {
	return (
		<Card
			key={blog.id}
			className="w-full max-w-md min-h-[8rem] max-h-[18rem] flex flex-col justify-between"
		>
			<CardHeader className="flex flex-col">
				<CardTitle
					className="text-2xl"
					dangerouslySetInnerHTML={{
						__html: truncate(sanitizeHtml(blog?.title), { length: 100 }) ?? "",
					}}
				/>
				<CardDescription
					dangerouslySetInnerHTML={{
						__html:
							truncate(sanitizeHtml(blog?.description as string), {
								length: 126,
							}) ?? "",
					}}
				/>
			</CardHeader>
			<CardFooter>
				<Link href={`/blogs/${blog.id}`}>
					<Button>Read more {">>"}</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}
