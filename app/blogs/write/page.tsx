import { getBlogById } from "@/app/actions";
import { WriteEditor } from "@/components/tiptap-templates/simple/write-editor";

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
			<WriteEditor isEditable={true} draftBlog={blog} />
		</div>
	);
}
