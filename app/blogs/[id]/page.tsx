import { getBlogById } from "@/app/actions";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

type Params = Promise<{ id: string }>;

export default async function BlogPage({ params }: { params: Params }) {
	const { id } = await params;

	const blog = await getBlogById(+id);

	return (
		<div className="mx-3 mt-3">
			<div>
				<Link href="/blogs">
					<Button variant="ghost">
						<ArrowLeftIcon />
					</Button>
				</Link>
			</div>
			<SimpleEditor
				isEditable={false}
				isViewing={true}
				blogTitle={blog.title}
				blogDescription={blog.description as unknown as string}
				blogContent={blog.content}
			/>
		</div>
	);
}
