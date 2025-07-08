import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Button } from "./ui/button";

type ToolbarButtonProps = {
	icon: ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
	>;
	label: string;
	shortcutCommand: string;
	toolbarEvent: () => void;
};

export default function ToolbarButton(props: ToolbarButtonProps) {
	const { icon: Icon, label, shortcutCommand, toolbarEvent } = props;

	return (
		<Button
			variant="ghost"
			className="w-full flex justify-between"
			onClick={toolbarEvent}
		>
			<div className="flex gap-2">
				<Icon />
				{label}
			</div>
			<span>{shortcutCommand}</span>
		</Button>
	);
}
