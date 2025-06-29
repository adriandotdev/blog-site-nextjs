"use client";
import { useCustomEditor } from "@/contexts/useEditor";
import { useModalStore } from "@/stores/useModalStore";
import {
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	List,
	ListChecks,
	ListOrdered,
} from "lucide-react";
import { BlockQuoteIcon } from "./tiptap-icons/block-quote-icon";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";

export default function EditorToolModal() {
	const name = useModalStore((state) => state.name);
	const hideModal = useModalStore((state) => state.hideModal);

	const { editor } = useCustomEditor();

	return (
		<Dialog
			open={name !== "hidden"}
			onOpenChange={() => {
				if (name !== "hidden") hideModal();
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Tools</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col gap-2">
					<Button
						variant="ghost"
						className="w-full flex justify-between"
						onClick={() =>
							editor?.chain().focus().toggleHeading({ level: 1 }).run()
						}
					>
						<div className="flex gap-2">
							<Heading1 />
							Heading 1
						</div>
						<span>#</span>
					</Button>
					<Button
						variant="ghost"
						className="w-full flex justify-between"
						onClick={() =>
							editor?.chain().focus().toggleHeading({ level: 2 }).run()
						}
					>
						<div className="flex gap-2">
							<Heading2 />
							Heading 2
						</div>
						<span>##</span>
					</Button>
					<Button
						variant="ghost"
						className="w-full flex justify-between"
						onClick={() =>
							editor?.chain().focus().toggleHeading({ level: 3 }).run()
						}
					>
						<div className="flex gap-2">
							<Heading3 />
							Heading 3
						</div>
						<span>###</span>
					</Button>
					<Button
						variant="ghost"
						className="w-full flex justify-between"
						onClick={() =>
							editor?.chain().focus().toggleHeading({ level: 4 }).run()
						}
					>
						<div className="flex gap-2">
							<Heading4 />
							Heading 4
						</div>
						<span>####</span>
					</Button>

					<Button
						variant="ghost"
						className="w-full flex justify-start"
						onClick={() => editor?.chain().focus().toggleBulletList().run()}
					>
						<div></div>
						<List />
						Bulleted List
					</Button>

					<Button
						variant="ghost"
						className="w-full flex justify-start"
						onClick={() => editor?.chain().focus().toggleOrderedList().run()}
					>
						<ListOrdered />
						Numbered List
					</Button>
					<Button
						variant="ghost"
						className="w-full flex justify-start"
						onClick={() => editor?.chain().focus().toggleTaskList().run()}
					>
						<ListChecks />
						To-do List
					</Button>

					<Button
						variant="ghost"
						className="w-full flex justify-start"
						onClick={() => editor?.chain().focus().toggleBlockquote().run()}
					>
						<BlockQuoteIcon />
						Blockquote
					</Button>
					<Separator />
				</div>
			</DialogContent>
		</Dialog>
	);
}
