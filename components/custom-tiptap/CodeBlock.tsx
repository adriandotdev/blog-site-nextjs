import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Check, Copy } from "lucide-react"; // Icons for UI
import { Node as ProseMirrorNode } from "prosemirror-model";
import { useState } from "react";
// import classes from "./code-block-component.module.css"; // CSS file for styling

function CodeBlockComponent({ node }: { node: ProseMirrorNode }) {
	const [copied, setCopied] = useState(false);

	// Function to copy code content
	const copyToClipboard = async () => {
		const codeContent = node.textContent;

		if (codeContent) {
			await navigator.clipboard.writeText(codeContent);
			setCopied(true);

			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<NodeViewWrapper className="relative">
			<button onClick={copyToClipboard} className="copyButton">
				{copied ? <Check size={16} /> : <Copy size={16} />}
			</button>

			<pre>
				<NodeViewContent as="code" />
			</pre>
		</NodeViewWrapper>
	);
}

export default CodeBlockComponent;
