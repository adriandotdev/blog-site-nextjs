import { Button } from "@/components/ui/button";

import BlogCard from "@/components/blog-card";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { getBlogs } from "../actions";

export default async function BlogIndex() {
	const blogs = await getBlogs();

	return (
		<div className="max-w-[100vw] py-3 px-3">
			<div className="flex justify-between items-center lg:justify-start lg:gap-5">
				<h1 className="text-2xl lg:text-3xl font-bold">Welcome Blogs</h1>
				<Link href={"/blogs/create"}>
					<Button>
						New <PencilIcon />
					</Button>
				</Link>
			</div>

			<div className="mt-4 flex gap-5 flex-wrap">
				{blogs.map(async (blog) => {
					return <BlogCard key={blog.id} blog={blog} />;
				})}
				{blogs.length === 0 && (
					<div className="flex flex-col">
						<h1 className="text-2xl lg:text-3xl font-bold text-center lg:text-left text-slate-950 dark:text-slate-200 mt-5">
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
