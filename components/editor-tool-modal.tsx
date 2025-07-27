"use client";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
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
		<CommandDialog
			className="dark:bg-slate-900"
			open={name !== "hidden"}
			onOpenChange={() => {
				if (name !== "hidden") hideModal();
			}}
		>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList className="dark:bg-slate-900">
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Basic Blocks">
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
				</CommandGroup>
				<CommandSeparator />
			</CommandList>
		</CommandDialog>
	);
}
