"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/stores/useModalStore";
import { Button } from "../ui/button";

export default function DialogModal() {
	const { options, name, hideModal } = useModalStore();

	return (
		<Dialog
			open={name !== "hidden" && name === "confirmation-modal"}
			onOpenChange={() => {
				hideModal();
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{options?.title}</DialogTitle>
					<DialogDescription>{options?.description}</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button onClick={options?.onPressCTA}>{options?.cta}</Button>
					<Button
						onClick={() => {
							hideModal();
						}}
						variant="ghost"
					>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
