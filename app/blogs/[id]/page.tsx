import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
type Params = Promise<{ id: string }>;

import { SelectBlogs } from "@/db/schema";
import type { Metadata } from "next";

type GenerateMetadataProps = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

type BlogMetadata = {
	tags: string[];
};

export async function generateMetadata({
	params,
}: GenerateMetadataProps): Promise<Metadata> {
	const { id } = await params;

	const response = await fetch(`${process.env.API_URL}/api/blogs/${id}`);

	const blog = (await response.json()) as SelectBlogs;

	const keywords = (blog.metadata as BlogMetadata | undefined)?.tags ?? [];

	return {
		title: sanitizeHtml(blog.title, { allowedAttributes: {}, allowedTags: [] }),
		description: sanitizeHtml(blog.description ?? "", {
			allowedAttributes: {},
			allowedTags: [],
		}),
		openGraph: {
			title: sanitizeHtml(blog.title, {
				allowedAttributes: {},
				allowedTags: [],
			}),
			description: sanitizeHtml(blog.description ?? "", {
				allowedAttributes: {},
				allowedTags: [],
			}),
			siteName: "The Daily Bytes",
			locale: "en_US",
			type: "website",
		},
		keywords,
	};
}

export default async function BlogPage({ params }: { params: Params }) {
	const { id } = await params;

	const response = await fetch(`${process.env.API_URL}/api/blogs/${id}`);

	const blog = (await response.json()) as SelectBlogs;

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
