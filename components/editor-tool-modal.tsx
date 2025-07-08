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
import ToolbarButton from "./toolbar-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";

export default function EditorToolModal() {
	const name = useModalStore((state) => state.name);
	const hideModal = useModalStore((state) => state.hideModal);

	const { editor } = useCustomEditor();

	const basicBlocks = [
		{
			icon: Heading1,
			label: "Heading 1",
			shortcutCommand: "#",
			toolbarEvent: () =>
				editor?.chain().focus().toggleHeading({ level: 1 }).run(),
		},
		{
			icon: Heading2,
			label: "Heading 2",
			shortcutCommand: "##",
			toolbarEvent: () =>
				editor?.chain().focus().toggleHeading({ level: 2 }).run(),
		},
		{
			icon: Heading3,
			label: "Heading 3",
			shortcutCommand: "###",
			toolbarEvent: () =>
				editor?.chain().focus().toggleHeading({ level: 3 }).run(),
		},
		{
			icon: Heading4,
			label: "Heading 4",
			shortcutCommand: "####",
			toolbarEvent: () =>
				editor?.chain().focus().toggleHeading({ level: 4 }).run(),
		},
		{
			icon: List,
			label: "Bulleted List",
			shortcutCommand: "-",
			toolbarEvent: () => editor?.chain().focus().toggleBulletList().run(),
		},
		{
			icon: ListOrdered,
			label: "Numbered List",
			shortcutCommand: "1.",
			toolbarEvent: () => editor?.chain().focus().toggleOrderedList().run(),
		},
		{
			icon: ListChecks,
			label: "To-do List",
			shortcutCommand: "[]",
			toolbarEvent: () => editor?.chain().focus().toggleTaskList().run(),
		},
		{
			icon: BlockQuoteIcon,
			label: "Blockquote",
			shortcutCommand: ">",
			toolbarEvent: () => editor?.chain().focus().toggleBlockquote().run(),
		},
	];

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
					{basicBlocks.map((block, index) => {
						return (
							<ToolbarButton
								key={index}
								icon={block.icon}
								label={block.label}
								shortcutCommand={block.shortcutCommand}
								toolbarEvent={() => {
									block.toolbarEvent();
									hideModal();
								}}
							/>
						);
					})}

					<Separator />
				</div>
			</DialogContent>
		</Dialog>
	);
}
