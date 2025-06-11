import { getBlogById } from "@/app/actions";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ id: string; draft: string }>;
}) {
	const search = await searchParams;

	let blog = undefined;

	if (search.id) blog = await getBlogById(+search.id);

	return (
		<div className="overflow-auto">
			<SimpleEditor isEditable={true} draftBlog={blog} />
		</div>
	);
}
