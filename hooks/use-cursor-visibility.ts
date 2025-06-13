/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client"

import { Editor } from "@tiptap/core";
import React from "react";
import { useWindowSize } from "./use-window-size";

// import * as React from "react"
// import type { Editor } from "@tiptap/react"
// import { useWindowSize } from "@/hooks/use-window-size"

// /**
//  * Interface defining required parameters for the cursor visibility hook
//  */
// export interface CursorVisibilityOptions {
//   /**
//    * The TipTap editor instance
//    */
//   editor: Editor | null
//   /**
//    * Reference to the toolbar element that may obscure the cursor
//    */
//   overlayHeight?: number
//   /**
//    * Reference to the element to track for cursor visibility
//    */
//   elementRef?: React.RefObject<HTMLElement> | null
// }

// /**
//  * Simplified DOMRect type containing only the essential positioning properties
//  */
// export type RectState = Pick<DOMRect, "x" | "y" | "width" | "height">

// /**
//  * Custom hook that ensures the cursor remains visible when typing in a TipTap editor.
//  * Automatically scrolls the window when the cursor would be hidden by the toolbar.
//  *
//  * This is particularly useful for long-form content editing where the cursor
//  * might move out of the visible area as the user types.
//  *
//  * @param options Configuration options for cursor visibility behavior
//  * @returns void
//  */
// export function useCursorVisibility({
//   editor,
//   overlayHeight = 0,
//   elementRef = null,
// }: CursorVisibilityOptions) {
//   const { height: windowHeight } = useWindowSize()
//   const [rect, setRect] = React.useState<RectState>({
//     x: 0,
//     y: 0,
//     width: 0,
//     height: 0,
//   })

//   const updateRect = React.useCallback(() => {
//     const element = elementRef?.current ?? document.body

//     const { x, y, width, height } = element.getBoundingClientRect()
//     setRect({ x, y, width, height })
//   }, [elementRef])

//   React.useEffect(() => {
//     const element = elementRef?.current ?? document.body

//     updateRect()

//     const resizeObserver = new ResizeObserver(() => {
//       window.requestAnimationFrame(updateRect)
//     })

//     resizeObserver.observe(element)
//     window.addEventListener("scroll", updateRect, { passive: true })

//     return () => {
//       resizeObserver.disconnect()
//       window.removeEventListener("scroll", updateRect)
//     }
//   }, [elementRef, updateRect])

//   React.useEffect(() => {
//     const ensureCursorVisibility = () => {
//       if (!editor) return

//       const { state, view } = editor

//       if (!view.hasFocus()) return

//       // Get current cursor position coordinates
//       const { from } = state.selection
//       const cursorCoords = view.coordsAtPos(from)

//       if (windowHeight < rect.height) {
//         if (cursorCoords) {
//           // Check if there's enough space between cursor and bottom of window
//           const availableSpace =
//             windowHeight - cursorCoords.top - overlayHeight > 0

//           // If not enough space, scroll to position cursor in the middle of viewport
//           if (!availableSpace) {
//             const targetScrollY =
//               // TODO: Needed?
//               //   window.scrollY + (cursorCoords.top - windowHeight / 2)
//               cursorCoords.top - windowHeight / 2

//             window.scrollTo({
//               top: targetScrollY,
//               behavior: "smooth",
//             })
//           }
//         }
//       }
//     }

//     ensureCursorVisibility()
//   }, [editor, overlayHeight, windowHeight, rect.height])

//   return rect
// }

// "use client";

// import { useWindowSize } from "@/hooks/use-window-size";
// import type { Editor } from "@tiptap/react";
// import * as React from "react";

export interface CursorVisibilityOptions {
	editor: Editor | null;
	overlayHeight?: number;
	elementRef?: React.RefObject<HTMLElement> | null;
	keyboardOffset?: number;
}

// export type RectState = Pick<DOMRect, "x" | "y" | "width" | "height">;

// export function useCursorVisibility({
// 	editor,
// 	overlayHeight = 0,
// 	elementRef = null,
// 	keyboardOffset = 0,
// }: CursorVisibilityOptions): RectState {
// 	const { height: windowHeight } = useWindowSize();
// 	const [rect, setRect] = React.useState<RectState>({
// 		x: 0,
// 		y: 0,
// 		width: 0,
// 		height: 0,
// 	});

// 	const updateRect = React.useCallback(() => {
// 		const element = elementRef?.current ?? document.body;
// 		const { x, y, width, height } = element.getBoundingClientRect();
// 		setRect({ x, y, width, height });
// 	}, [elementRef]);

// 	// Update tracked element size + position
// 	React.useEffect(() => {
// 		const element = elementRef?.current ?? document.body;
// 		updateRect();

// 		const resizeObserver = new ResizeObserver(() => {
// 			window.requestAnimationFrame(updateRect);
// 		});
// 		resizeObserver.observe(element);

// 		window.addEventListener("scroll", updateRect, { passive: true });

// 		return () => {
// 			resizeObserver.disconnect();
// 			window.removeEventListener("scroll", updateRect);
// 		};
// 	}, [elementRef, updateRect]);

// 	// Keep cursor visible as it moves
// 	React.useEffect(() => {
// 		if (!editor) return;

// 		const ensureCursorVisibility = () => {
// 			const { state, view } = editor;
// 			if (!view.hasFocus()) return;

// 			const { from } = state.selection;
// 			const coords = view.coordsAtPos(from);

// 			const safeBottom =
// 				window.innerHeight - overlayHeight - keyboardOffset - 20;

// 			if (coords.bottom > safeBottom) {
// 				window.scrollTo({
// 					top: window.scrollY + (coords.bottom - safeBottom),
// 					behavior: "smooth",
// 				});
// 			}
// 		};

// 		editor.on("selectionUpdate", ensureCursorVisibility);
// 		editor.on("transaction", ensureCursorVisibility);

// 		// Run initially too
// 		ensureCursorVisibility();

// 		return () => {
// 			editor?.off("selectionUpdate", ensureCursorVisibility);
// 			editor?.off("transaction", ensureCursorVisibility);
// 		};
// 	}, [editor, overlayHeight, keyboardOffset]);

// 	return rect;
// }
export function useCursorVisibility({
	editor,
	overlayHeight = 0,
}: CursorVisibilityOptions) {
	const { height: windowHeight } = useWindowSize();

	React.useEffect(() => {
		if (!editor) return;

		const handleScrollToCursor = () => {
			if (!editor.view.hasFocus()) return;

			const { from } = editor.state.selection;
			const cursorCoords = editor.view.coordsAtPos(from);

			const toolbarHeight = overlayHeight;
			const spaceBelowCursor = windowHeight - cursorCoords.bottom;

			// If the cursor is behind the toolbar or keyboard
			if (spaceBelowCursor < toolbarHeight + 12) {
				const targetScroll =
					window.scrollY + cursorCoords.top - windowHeight / 2;
				window.scrollTo({
					top: targetScroll,
					behavior: "smooth",
				});
			}
		};

		// Scroll every time the selection changes (i.e., user types or moves cursor)
		const updateOnSelection = () => {
			requestAnimationFrame(handleScrollToCursor);
		};

		const view = editor.view;
		view.dom.addEventListener("focus", handleScrollToCursor);
		editor.on("selectionUpdate", updateOnSelection);

		return () => {
			view.dom.removeEventListener("focus", handleScrollToCursor);
			editor.off("selectionUpdate", updateOnSelection);
		};
	}, [editor, overlayHeight, windowHeight]);
}
