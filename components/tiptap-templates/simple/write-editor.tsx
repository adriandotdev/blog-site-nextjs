"use client";

import { BubbleMenu, EditorContent } from "@tiptap/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// --- UI Primitives ---
import {
	ToolbarGroup,
	ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";

// --- Hooks ---
import { useIsMobile } from "@/hooks/use-mobile";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

import { saveBlogAsDraft } from "@/app/actions";
import { Button as ShadCnButton } from "@/components/ui/button";
import { useCustomEditor } from "@/contexts/useEditor";
import { SelectBlogs } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useModalStore } from "@/stores/useModalStore";
import { useSheetComponentStore } from "@/stores/useSheetComponentStore";
import { debounce } from "lodash";
import { AlignLeft } from "lucide-react";

type SimpleEditorProps = {
	isEditable: boolean;
	isViewing?: boolean;
	draftBlog?: SelectBlogs;
};

export function WriteEditor({
	isEditable,
	isViewing,
	draftBlog,
}: SimpleEditorProps) {
	const session = useSession();
	const router = useRouter();
	const { showModal } = useModalStore();
	const { showSheetComponent } = useSheetComponentStore();
	const {
		title,
		setTitle,
		description,
		setDescription,
		content,
		setContent,
		titleEditor,
		descriptionEditor,
		editor,
	} = useCustomEditor();
	const isMobile = useIsMobile();

	const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
		"main"
	);

	// States
	const [isPublishing, setPublishing] = useState(false);
	const [isSavingAsDraft, setSaveAsDraft] = useState(false);
	const [hasInitializedDraft, setHasInitializedDraft] = useState(false);

	// State for determining if draft has changed.
	const [draftChanged, setDraftChanged] = useState(false);

	// Timeout reference to have a timeout for showing the text "Saved" when modifying a draft.
	const textDraftRef = useRef<NodeJS.Timeout>(null);

	const handleSavingAsDraftOnInput = useCallback(async () => {
		try {
			if (textDraftRef.current) clearTimeout(textDraftRef.current);

			setDraftChanged(true);
			setSaveAsDraft(true);
			await saveBlogAsDraft(
				{
					id: draftBlog?.id ?? undefined,
					title,
					description,
					content,
				},
				session.data?.user?.email as string
			);
		} catch (err) {
			console.error("Error in saving blog as draft", err);
		} finally {
			setSaveAsDraft(false);

			textDraftRef.current = setTimeout(() => {
				setDraftChanged(false);
			}, 1500);
		}
	}, [content, description, session.data?.user?.email, title, draftBlog]);

	const handleSavingAsDraftOnClick = useCallback(async () => {
		try {
			setSaveAsDraft(true);
			await saveBlogAsDraft(
				{
					id: draftBlog?.id ?? undefined,
					title,
					description,
					content,
				},
				session.data?.user?.email as string
			);

			toast("You've successfully published your blog!", { duration: 1500 });
			router.push("/blogs/drafts");
		} catch (err) {
			console.error("Error in saving blog as draft", err);
		} finally {
			setSaveAsDraft(false);
		}
	}, [
		content,
		description,
		draftBlog,
		router,
		session.data?.user?.email,
		title,
	]);

	const handlePublish = useCallback(async () => {
		try {
			showSheetComponent("publish-sheet", {
				id: draftBlog?.id ?? undefined,
				title,
				description,
				content,
				email: session.data?.user?.email ?? "",
			});
		} catch (err) {
			console.error("Error in publishing a blog", err);
		} finally {
			setPublishing(false);
		}
	}, [content, description, session.data?.user?.email, title, draftBlog]);

	const shouldDisable = () =>
		titleEditor?.isEmpty || editor?.isEmpty || !isEditable;

	useEffect(() => {
		if (!titleEditor || !descriptionEditor || !editor) return;

		queueMicrotask(() => {
			setContent("");
			setTitle("");
			setDescription("");

			if (
				titleEditor?.commands &&
				descriptionEditor?.commands &&
				editor?.commands
			) {
				titleEditor.commands.setContent("");
				descriptionEditor.commands.setContent("");
				editor.commands.setContent("");
			}
		});
	}, []);

	useEffect(() => {
		if (!isMobile && mobileView !== "main") {
			setMobileView("main");
		}
	}, [isMobile, mobileView]);

	useEffect(() => {
		if (
			!draftBlog ||
			hasInitializedDraft ||
			!titleEditor ||
			!descriptionEditor ||
			!editor
		)
			return;

		queueMicrotask(() => {
			setTitle(draftBlog.title);
			setDescription(draftBlog.description ?? "");
			setContent(draftBlog.content);

			titleEditor.commands.setContent(draftBlog.title ?? "");
			descriptionEditor.commands.setContent(draftBlog.description ?? "");
			editor.commands.setContent(draftBlog.content ?? "");

			setHasInitializedDraft(true);
		});
	}, [draftBlog, hasInitializedDraft, titleEditor, descriptionEditor, editor]);

	const saveDraftOnInput = useMemo(
		() => debounce(handleSavingAsDraftOnInput, 500),
		[handleSavingAsDraftOnInput]
	);

	useEffect(() => {
		return () => saveDraftOnInput.cancel();
	}, [saveDraftOnInput]);

	return (
		<>
			{!isViewing && (
				<div
					className={"flex flex-row items-center mt-3 px-5 justify-end gap-2"}
				>
					{draftBlog && (
						<span className="font-medium text-[0.9rem] text-green-800 mr-5">
							{draftChanged ? "Saved" : ""}
						</span>
					)}
					{!draftBlog && (
						<ShadCnButton
							className="disabled:cursor-not-allowed"
							disabled={shouldDisable()}
							onClick={handleSavingAsDraftOnClick}
						>
							{isSavingAsDraft ? "Saving..." : "Save as draft"}
						</ShadCnButton>
					)}
					<ShadCnButton
						className="disabled:cursor-not-allowed"
						disabled={shouldDisable()}
						onClick={handlePublish}
					>
						{isPublishing ? "Publishing..." : "Publish"}
					</ShadCnButton>
					<ShadCnButton
						variant="ghost"
						onClick={() => showModal("block-modal")}
					>
						<AlignLeft />
					</ShadCnButton>
				</div>
			)}

			<div className={cn("content-wrapper overflow-y-hidden pb-10")}>
				<EditorContent
					key={"title-editor-key"}
					editor={titleEditor}
					className="title-editor-content"
				/>
				<EditorContent
					key={"description-editor-key"}
					editor={descriptionEditor}
					className="description-editor-content"
				/>
				{editor && (
					<BubbleMenu
						editor={editor}
						tippyOptions={{
							duration: 100,
							placement: "auto",
						}}
					>
						<div className="bubble-menu">
							<ToolbarGroup>
								<MarkButton key="bold" type="bold" />
								<MarkButton key="italic" type="italic" />
								<MarkButton key="strike" type="strike" />
								<MarkButton key="code" type="code" />
								<MarkButton key="underline" type="underline" />
							</ToolbarGroup>
							<ToolbarSeparator />
							<ToolbarGroup>
								<TextAlignButton key="left" align="left" />
								<TextAlignButton key="center" align="center" />
								<TextAlignButton key="right" align="right" />
								<TextAlignButton key="justify" align="justify" />
							</ToolbarGroup>

							<ToolbarGroup>
								<MarkButton key="superscript" type="superscript" />
								<MarkButton key="subscript" type="subscript" />
							</ToolbarGroup>
						</div>
					</BubbleMenu>
				)}
				<EditorContent
					key={"editor-content-key"}
					editor={editor}
					role="presentation"
					className="simple-editor-content"
					onInput={() => {
						if (draftBlog) saveDraftOnInput();
					}}
				/>
			</div>
		</>
	);
}
