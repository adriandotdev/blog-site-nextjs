import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type ToolbarButtonProps = {
	icon: ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
	>;
	label: string;
	shortcutCommand: string;
	toolbarEvent: () => void;
};

import { CommandItem } from "./ui/command";
export default function ToolbarButton(props: ToolbarButtonProps) {
	const { icon: Icon, label, shortcutCommand, toolbarEvent } = props;

	return (
		<CommandItem
			className="w-full flex justify-between hover:bg-slate-900"
			onSelect={toolbarEvent}
		>
			<div className="flex gap-2">
				<Icon />
				{label}
			</div>
			<span>{shortcutCommand}</span>
		</CommandItem>
	);
}
