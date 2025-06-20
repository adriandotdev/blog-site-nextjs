import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

import { DomUtils, parseDocument } from "htmlparser2";

export function estimateReadTimeFromHTML(htmlString: string): string {
	console.log(htmlString);
	const dom = parseDocument(htmlString);

	// Get all <code> and <pre> tags
	const codeElements = DomUtils.findAll(
		(el) => el.name === "code" || el.name === "pre",
		[dom]
	);

	// Count code lines and remove code from DOM to avoid double-counting
	let codeLines = 0;
	for (const el of codeElements) {
		const codeText = DomUtils.textContent(el);
		codeLines += codeText.trim().split("\n").length;
		DomUtils.removeElement(el); // so we don’t count code as normal text
	}

	// Get remaining plain text (without code)
	const plainText = DomUtils.textContent(dom);
	const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;

	// Calculate read times
	const textTime = wordCount / 200; // 200 WPM for text
	const codeTime = (codeLines * 3) / 60; // 3 seconds per code line

	const totalTime = Math.ceil(textTime + codeTime);
	console.log(textTime, codeTime);
	return `${totalTime} min read`;
}
