import { getBlogById } from "@/app/actions";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import Link from "next/link";

type Params = Promise<{ id: string }>;

export default async function BlogPage({ params }: { params: Params }) {
	const { id } = await params;

	const blog = await getBlogById(+id);

	if (blog.visibility === "private") {
		return (
			<div className="flex flex-col justify-center items-center  min-h-[50vh]">
				<h1 className="text-2xl md:text-4xl lg:text-5xl font-archivo font-bold">
					This content is private.
				</h1>
				<p className="text-md md:text-xl">
					Only the author can view this content.
				</p>
				<Link
					href="/blogs"
					className="mt-3 font-bold border-[0.5px] bg-slate-950 text-white px-5 py-3 rounded-[8px]"
				>
					Go back
				</Link>
			</div>
		);
	}

	return (
		<div className="mx-3 mt-3">
			<SimpleEditor isEditable={false} isViewing={true} blog={blog} />
		</div>
	);
}
