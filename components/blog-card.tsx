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
import { CheckIcon, FileEditIcon, HeartIcon, Link2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { toast } from "sonner";

export default function BlogCard({ blog }: { blog: SelectBlogs }) {
	const session = useSession();

	if (!session.data?.user) return;

	const redirectTo = () => {
		if (blog.status === "draft") return `/blogs/write?draft=true&id=${blog.id}`;

		return `/blogs/${blog.id}`;
	};

	const handleCopy = async () => {
		const baseUrl = window.location.origin;
		const fullUrl = `${baseUrl}/blog/${blog.id}`;

		try {
			await navigator.clipboard.writeText(fullUrl);
			toast("Link copied to clipboard!", {
				duration: 1500,
				position: "top-center",
				icon: <CheckIcon className="text-green-500" />,
			});
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (err) {
			toast("Link copied to clipboard!", { duration: 1500 });
		}
	};

	return (
		<Card
			key={blog.id}
			className="w-full max-w-md min-h-[8rem] max-h-[18rem] flex flex-col justify-between dark:bg-slate-900 hover:border-[0.1px] hover:border-slate-50"
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
						className="text-2xl line-clamp-3 font-lora font-semibold text-slate-700 dark:text-slate-100"
						dangerouslySetInnerHTML={{
							__html:
								truncate(sanitizeHtml(blog?.title), { length: 100 }) ?? "",
						}}
					/>
					<CardDescription
						className="line-clamp-2 font-roboto leading-relaxed font-medium text-slate-500 dark:text-slate-300"
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
					<Link href={`/blogs/write?draft=true&id=${blog.id}`}>
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

				<div>
					<Button
						variant="ghost"
						onClick={handleCopy}
						className="ml-2"
						size="icon"
					>
						<Link2Icon />
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
