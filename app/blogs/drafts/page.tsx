import { getBlogs } from "@/app/actions";
import { auth } from "@/auth";
import BlogCard from "@/components/blog-card";

export default async function DraftsPage() {
	const session = await auth();

	const data = await getBlogs(session?.user?.email as string, "draft");

	return (
		<div className="max-w-[100vw] py-3 px-3">
			<div className="flex justify-between items-center lg:justify-start lg:gap-5">
				<h1 className="text-2xl lg:text-3xl font-bold font-archivo">
					My Drafts
				</h1>
			</div>

			<div className="mt-4 flex gap-5 flex-wrap">
				{data.map(async (row) => {
					return <BlogCard key={row.blogs.id} blog={row.blogs} />;
				})}
				{data.length === 0 && (
					<div className="flex flex-col w-full">
						<h1 className="text-2xl lg:text-3xl font-bold text-center lg:text-left text-slate-950 dark:text-slate-200 mt-5">
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
