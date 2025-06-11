"use client";
import { Badge } from "@/components/ui/badge";
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
import { FileEditIcon, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import sanitizeHtml from "sanitize-html";
export default function BlogCard({ blog }: { blog: SelectBlogs }) {
	const session = useSession();

	if (!session.data?.user) return;

	const redirectTo = React.useCallback(() => {
		if (blog.status === "draft") return `/blogs/drafts/${blog.id}`;

		return `/blogs/${blog.id}`;
	}, [blog]);

	return (
		<Card
			key={blog.id}
			className="w-full max-w-md min-h-[8rem] max-h-[18rem] flex flex-col justify-between"
		>
			<Link href={redirectTo()}>
				<CardHeader className="flex flex-col">
					<div className="w-full flex justify-between">
						<div className="flex gap-2">
							<Image
								src={session.data.user.image as string}
								alt="User Avatar"
								width={24}
								height={24}
								className="rounded-full"
							/>
							<p className="font-medium font-archivo">
								{session.data.user.name}
							</p>
						</div>
						{blog.status === "draft" && (
							<Badge className="max-w-[4rem] w-full" variant={"outline"}>
								Draft
							</Badge>
						)}
					</div>
					<CardTitle
						className="text-2xl line-clamp-3"
						dangerouslySetInnerHTML={{
							__html:
								truncate(sanitizeHtml(blog?.title), { length: 100 }) ?? "",
						}}
					/>
					<CardDescription
						className="line-clamp-2"
						dangerouslySetInnerHTML={{
							__html:
								truncate(sanitizeHtml(blog?.description as string), {
									length: 126,
								}) ?? "",
						}}
					/>
				</CardHeader>
			</Link>
			<CardFooter>
				{blog.status === "draft" && (
					<Link href={`/blogs/drafts/${blog.id}`}>
						<Button>
							<FileEditIcon /> Continue writing
						</Button>
					</Link>
				)}

				{blog.status === "published" && (
					<Link href={`/blogs/${blog.id}`}>
						<Button>{"Read More >>"}</Button>
					</Link>
				)}
				{blog.status === "published" && (
					<div className="ml-3">
						<div className="flex">
							<HeartIcon />
							<span>0</span>
						</div>
					</div>
				)}
			</CardFooter>
		</Card>
	);
}
