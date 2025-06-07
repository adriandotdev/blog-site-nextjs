import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

export default function Page() {
	return (
		<div className="overflow-auto">
			<SimpleEditor isEditable={true} />
		</div>
	);
}
