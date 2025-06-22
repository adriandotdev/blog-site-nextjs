"use client";

import { BubbleMenu, EditorContent } from "@tiptap/react";
import { useCallback, useEffect, useState } from "react";

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

import { publishBlog, saveBlogAsDraft } from "@/app/actions";
import { Button as ShadCnButton } from "@/components/ui/button";
import { useCustomEditor } from "@/contexts/useEditor";
import { SelectBlogs } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

	const handleSavingAsDraft = useCallback(async () => {
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
			toast("Blog saved as draft successfully!", { duration: 1500 });
			router.push("/blogs/drafts");
		} catch (err) {
			console.error("Error in saving blog as draft", err);
		} finally {
			setSaveAsDraft(false);
		}
	}, [content, description, session.data?.user?.email, title, draftBlog]);

	const handlePublish = useCallback(async () => {
		try {
			console.log("try");
			setPublishing(true);
			await publishBlog(
				{
					id: draftBlog?.id ?? undefined,
					title,
					description,
					content,
				},
				session.data?.user?.email as string
			);
			toast("You've successfully published your blog!", { duration: 1500 });
			router.push("/blogs");
			// setTimeout(() => {
			// 	router.push("/blogs");
			// }, 1500);
		} catch (err) {
			console.error("Error in publishing a blog", err);
		} finally {
			setPublishing(false);
		}
	}, [content, description, session.data?.user?.email, title, draftBlog]);

	const shouldDisable = () =>
		titleEditor?.isEmpty || editor?.isEmpty || !isEditable;

	useEffect(() => {
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
	}, []);

	useEffect(() => {
		if (!isMobile && mobileView !== "main") {
			setMobileView("main");
		}
	}, [isMobile, mobileView]);

	useEffect(() => {
		const canInitialize =
			draftBlog &&
			!hasInitializedDraft &&
			titleEditor?.commands &&
			descriptionEditor?.commands &&
			editor?.commands;

		if (canInitialize) {
			setTitle(draftBlog.title);
			setDescription(draftBlog.description ?? "");
			setContent(draftBlog.content);

			if (
				titleEditor?.commands &&
				descriptionEditor?.commands &&
				editor?.commands
			) {
				titleEditor.commands.setContent(draftBlog.title ?? "");
				descriptionEditor.commands.setContent(draftBlog.description ?? "");
				editor.commands.setContent(draftBlog.content ?? "");
			}
			setHasInitializedDraft(true);
		}
	}, [
		descriptionEditor?.commands,
		draftBlog,
		editor?.commands,
		hasInitializedDraft,
		setContent,
		setDescription,
		setTitle,
		titleEditor?.commands,
	]);

	return (
		<>
			{!isViewing && (
				<div>
					<div className="flex gap-2 justify-end mt-3">
						<ShadCnButton
							className="disabled:cursor-not-allowed"
							disabled={shouldDisable()}
							onClick={handleSavingAsDraft}
						>
							{isSavingAsDraft ? "Saving..." : "Save as draft"}
						</ShadCnButton>
						<ShadCnButton
							className="disabled:cursor-not-allowed"
							disabled={shouldDisable()}
							onClick={handlePublish}
						>
							{isPublishing ? "Publishing..." : "Publish"}
						</ShadCnButton>
					</div>
					{/* <Toolbar
						ref={toolbarRef}
						style={
							isMobile
								? {
										bottom: `calc(100% - ${windowSize.height - bodyRect.y}px)`,
										overflow: "auto",
								  }
								: {}
						}
						className="overflow-x-auto mt-3 "
						variant={`${isMobile ? "floating" : "fixed"}`}
					>
						<MainToolbarContent
							onHighlighterClick={() => setMobileView("highlighter")}
							onLinkClick={() => setMobileView("link")}
							isMobile={isMobile}
							isEditable={isEditable}
							isViewing={isViewing as boolean}
						/>
					</Toolbar> */}
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
								<MarkButton type="bold" />
								<MarkButton type="italic" />
								<MarkButton type="strike" />
								<MarkButton type="code" />
								<MarkButton type="underline" />
								{/* {!isMobile ? (
                                    <ColorHighlightPopover />
                                ) : (
                                    <ColorHighlightPopoverButton onClick={onHighlighterClick} />
                                )}
                                {!isMobile ? (
                                    <LinkPopover />
                                ) : (
                                    <LinkButton onClick={onLinkClick} />
                                )} */}
							</ToolbarGroup>
							<ToolbarSeparator />
							<ToolbarGroup>
								<TextAlignButton align="left" />
								<TextAlignButton align="center" />
								<TextAlignButton align="right" />
								<TextAlignButton align="justify" />
							</ToolbarGroup>

							<ToolbarGroup>
								<MarkButton type="superscript" />
								<MarkButton type="subscript" />
							</ToolbarGroup>
						</div>
					</BubbleMenu>
				)}
				<EditorContent
					key={"editor-content-key"}
					editor={editor}
					role="presentation"
					className="simple-editor-content"
				/>
			</div>
		</>
	);
}
