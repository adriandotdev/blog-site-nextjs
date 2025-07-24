import { getBlogById } from "@/app/actions";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

type Params = Promise<{ id: string }>;

export default async function BlogPage({ params }: { params: Params }) {
	const { id } = await params;

	const blog = await getBlogById(+id);

	return (
		<div className="mx-3 mt-3">
			<SimpleEditor isEditable={false} isViewing={true} blog={blog} />
		</div>
	);
}
