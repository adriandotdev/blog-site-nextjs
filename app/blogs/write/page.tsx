import { WriteEditor } from "@/components/tiptap-templates/simple/write-editor";
import { SelectBlogs } from "@/db/schema";

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ id: string; draft: string }>;
}) {
	const search = await searchParams;

	let blog = undefined;

	if (search.id) {
		const response = await fetch(
			`${process.env.API_URL}/api/blogs/${search.id}`
		);

		blog = (await response.json()) as SelectBlogs;
	}

	return (
		<div className="overflow-auto">
			<WriteEditor isEditable={true} draftBlog={blog} />
		</div>
	);
}
