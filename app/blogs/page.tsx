import { Button } from "@/components/ui/button";

import { auth } from "@/auth";
import BlogCard from "@/components/blog-card";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { getBlogs } from "../actions";

export default async function BlogIndex() {
	const session = await auth();

	const userEmail = session?.user?.email;
	const name = session?.user?.name;
	const data = await getBlogs(userEmail as string, "published");

	return (
		<div className="max-w-[100vw] py-3 px-3">
			<div className="flex flex-col gap-2  lg:flex-row lg:gap-5">
				<h1 className="text-2xl lg:text-3xl font-lora font-semibold">
					Welcome, {name}
				</h1>
				<Link href={"/blogs/write"}>
					<Button>
						<PencilIcon />
						Write
					</Button>
				</Link>
			</div>

			<div className="mt-4 flex gap-5 flex-wrap">
				{data.map(async (row) => {
					return <BlogCard key={row.blogs.id} blog={row.blogs} />;
				})}
				{data.length === 0 && (
					<div className="flex flex-col w-full justify-center items-center pt-24">
						<h1 className="text-2xl lg:text-3xl font-bold text-center lg:text-left text-slate-950 dark:text-slate-200 mt-5 font-lora">
							You haven’t published any blogs yet.
						</h1>
						<p className="text-center font-medium lg:text-left">
							Start sharing your thoughts — your first post is just a click
							away!
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
