import { auth } from "@/auth";
import BlogCard from "@/components/blog-card";
import { BlogsResponse } from "../page";

export default async function DraftsPage() {
	const session = await auth();

	const response = await fetch(
		`http://localhost:3000/api/blogs?email=${session?.user?.email}&status=draft`
	);
	const data: BlogsResponse[] = await response.json();

	return (
		<div className="max-w-[100vw] py-3 px-3">
			<div className="flex justify-between items-center lg:justify-start lg:gap-5">
				<h1 className="text-2xl lg:text-3xl font-bold font-lora">My Drafts</h1>
			</div>

			<div className="mt-4 flex gap-5 flex-wrap">
				{data.map(async (row) => {
					return <BlogCard key={row.blogs.id} blog={row.blogs} />;
				})}
				{data.length === 0 && (
					<div className="flex flex-col w-full items-center pt-24">
						<h1 className="text-2xl lg:text-3xl font-bold text-center lg:text-left text-slate-950 dark:text-slate-200 mt-5 font-lora">
							No drafts yet.
						</h1>
						<p className="text-center font-medium lg:text-left">
							Save your thoughts as drafts while you write.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
