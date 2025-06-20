/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { EditorContext } from "@tiptap/react";
import * as React from "react";

// --- UI Primitives ---
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
	Toolbar,
	ToolbarGroup,
	ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { BlockQuoteButton } from "@/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import {
	ColorHighlightPopover,
	ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover";
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { LinkButton, LinkPopover } from "@/components/tiptap-ui/link-popover";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

// --- Hooks ---
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";
import { useCustomEditor } from "@/contexts/useEditor";
import { useKeyboardOffset } from "@/contexts/useKeyboardHeight";

const MainToolbarContent = ({
	onHighlighterClick,
	onLinkClick,
	isMobile,
}: {
	onHighlighterClick: () => void;
	onLinkClick: () => void;
	isMobile: boolean;
}) => {
	return (
		<>
			<Spacer />

			<ToolbarGroup>
				<UndoRedoButton action="undo" />
				<UndoRedoButton action="redo" />
			</ToolbarGroup>

			<ToolbarSeparator />

			<ToolbarGroup>
				<HeadingDropdownMenu levels={[1, 2, 3, 4]} />
				<ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
				<BlockQuoteButton />
				<CodeBlockButton />
			</ToolbarGroup>

			<ToolbarSeparator />

			<ToolbarGroup>
				<MarkButton type="bold" />
				<MarkButton type="italic" />
				<MarkButton type="strike" />
				<MarkButton type="code" />
				<MarkButton type="underline" />
				{!isMobile ? (
					<ColorHighlightPopover />
				) : (
					<ColorHighlightPopoverButton onClick={onHighlighterClick} />
				)}
				{!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
			</ToolbarGroup>

			<ToolbarSeparator />

			<ToolbarGroup>
				<MarkButton type="superscript" />
				<MarkButton type="subscript" />
			</ToolbarGroup>

			<ToolbarSeparator />

			<ToolbarGroup>
				<TextAlignButton align="left" />
				<TextAlignButton align="center" />
				<TextAlignButton align="right" />
				<TextAlignButton align="justify" />
			</ToolbarGroup>

			<ToolbarSeparator />

			<ToolbarGroup>
				<ImageUploadButton text="Add" />
			</ToolbarGroup>

			<Spacer />

			{isMobile && <ToolbarSeparator />}
		</>
	);
};

export default function BlogLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const isMobile = useIsMobile();
	const toolbarRef = React.useRef<HTMLDivElement>(null);
	const windowSize = useWindowSize();

	const editor = useCustomEditor();
	const keyboardOffset = useKeyboardOffset();

	const overlayHeight = toolbarRef.current?.offsetHeight ?? 0;

	const bodyRect = useCursorVisibility({
		editor: editor.editor,
		overlayHeight,
	});

	const [mobileView, setMobileView] = React.useState<
		"main" | "highlighter" | "link"
	>("main");

	return (
		<EditorContext.Provider value={{ editor: editor.editor }}>
			<div className="w-full relative">
				{isMobile && (
					<div style={{ position: "fixed", top: 0, left: 0, zIndex: 999 }}>
						<pre>{JSON.stringify(bodyRect, null, 2)}</pre>
					</div>
				)}
				<Toolbar
					ref={toolbarRef}
					style={
						isMobile
							? {
									// bottom: `calc(100dvh - ${windowSize.height - bodyRect.y}px)`,
									// bottom: `${
									// 	keyboardOffset + (windowSize.height - bodyRect.height)
									// }px`,
									position: "fixed",
									bottom: keyboardOffset,
									left: 0,
									right: 0,
									transition: "bottom 0.3s ease", // smooth appearance
									zIndex: 1000,
							  }
							: {
									// overflow: "auto",
									// position: "fixed",
									// top: 0,
									// zIndex: 50,
									// left: 0,
									// right: 0,
									// height: "auto",
									// marginTop: 0,
									// marginLeft: 256,
									// display: "flex",
									// justifyContent: "center",
							  }
					}
					className="overflow-x-auto mt-3"
					variant={`${isMobile ? "floating" : "fixed"}`}
				>
					<MainToolbarContent
						onHighlighterClick={() => setMobileView("highlighter")}
						onLinkClick={() => setMobileView("link")}
						isMobile={isMobile}
					/>
				</Toolbar>
				{children}
			</div>
		</EditorContext.Provider>
	);
}
