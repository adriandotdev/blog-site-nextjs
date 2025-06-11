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
import { HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
export default function BlogCard({ blog }: { blog: SelectBlogs }) {
	const session = useSession();

	if (!session.data?.user) return;

	return (
		<Card
			key={blog.id}
			className="w-full max-w-md min-h-[8rem] max-h-[18rem] flex flex-col justify-between"
		>
			<Link href={`/blogs/${blog.id}`}>
				<CardHeader className="flex flex-col">
					<div className="flex gap-2">
						<Image
							src={session.data.user.image as string}
							alt="User Avatar"
							width={24}
							height={24}
							className="rounded-full"
						/>
						<p className="font-medium font-archivo">{session.data.user.name}</p>
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
				<Link href={`/blogs/${blog.id}`}>
					<Button>Read more {">>"}</Button>
				</Link>
				<div className="ml-3">
					<div className="flex">
						<HeartIcon />
						<span>0</span>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
