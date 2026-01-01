"use client";

import { publishBlog } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useModalStore } from "@/stores/useModalStore";
import { useSheetComponentStore } from "@/stores/useSheetComponentStore";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import sanitizeHtml from "sanitize-html";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
export default function PublishSheet() {
	const { name, hideSheetComponent, payload } = useSheetComponentStore();

	const { showModal, hideModal } = useModalStore();

	const router = useRouter();

	const [formData, setFormData] = useState({
		tag: "",
		tags: [] as string[],
	});

	const handleFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			const newTag: string = formData.tag;

			setFormData({
				...formData,
				tags: [...formData.tags, newTag],
				tag: "",
			});
		}
	};

	const handlePublish = () => {
		try {
			showModal("confirmation-modal", {
				title: "Are you sure you want to publish this blog?",
				description: sanitizeHtml(payload.title, {
					allowedTags: [],
					allowedAttributes: {},
				}),
				cta: "Publish",
				onPressCTA: async () => {
					hideModal();
					// setPublishing(true);
					await publishBlog(
						{
							id: payload.id ?? undefined,
							title: payload.title,
							description: payload.description,
							content: payload.content,
							metadata: { tags: formData.tags },
						},
						payload.email
					);
					toast("You've successfully published your blog!", { duration: 1500 });
					setFormData({
						tag: "",
						tags: [] as string[],
					});
					hideSheetComponent();

					router.push("/blogs");
				},
			});
		} catch (err) {
			console.error("Error in publishing a blog", err);
		} finally {
		}
	};

	return (
		<Sheet open={name === "publish-sheet"} onOpenChange={hideSheetComponent}>
			<SheetContent className="w-full md:max-w-[400px] px-4 py-8">
				<SheetHeader>
					<SheetTitle className="text-3xl">Finishing Up</SheetTitle>
					{/* @TODO Change this description if in prod. */}
					<SheetDescription>Just description</SheetDescription>
				</SheetHeader>

				{/* @TODO this should be a suggestion mechanism based on the data from the database. For now user can only enter their respective tags. */}
				<div className="px-4 flex flex-col gap-3">
					<div className="flex flex-col gap-3">
						<Label>Tags</Label>
						<Input
							name="tag"
							placeholder="Please enter a maximum of 5 tags"
							value={formData.tag}
							onChange={handleFormChange}
							onKeyDown={handleTagInput}
						/>
						<small>Please provide tags for your article.</small>
						<div className="flex gap-2 flex-wrap">
							{formData.tags?.map((tag, index) => (
								<Badge className="cursor-pointer" key={index}>
									<span>#{tag.split(" ").join("")}</span>{" "}
									<button
										onClick={() => {
											setFormData((prev) => ({
												tag: "",
												tags: prev.tags.filter((_, i) => i !== index),
											}));
										}}
									>
										<XIcon className="cursor-pointer size-[12px]" />
									</button>
								</Badge>
							))}
						</div>
					</div>
					<Button className="mt-5" onClick={handlePublish}>
						Publish
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
