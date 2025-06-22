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
			<div className="max-w-[640px] mx-auto my-0 px-3 lg:px-6">
				<Link href="/blogs">
					<Button variant="ghost">
						<ArrowLeftIcon />
					</Button>
				</Link>
			</div>
			<SimpleEditor isEditable={false} isViewing={true} blog={blog} />
		</div>
	);
}
