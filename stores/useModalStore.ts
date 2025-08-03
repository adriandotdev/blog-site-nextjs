import { create } from "zustand";

type ModalValues = "hidden" | "block-modal" | "confirmation-modal";

interface ModalOptions {
	errorMessage?: string;
	title?: string;
	description?: string;
	cta?: string;
	onPressCTA?: () => void;
	variant?: "light" | "dark";
	content?: React.ReactNode;
	ctaColor?: string;
}

type ModalStore = {
	name: ModalValues;
	showModal: (
		name: "hidden" | "block-modal" | "confirmation-modal",
		options?: ModalOptions
	) => void;
	hideModal: () => void;
	options?: ModalOptions;
};

export const useModalStore = create<ModalStore>((set) => ({
	name: "hidden",
	options: {},
	showModal: (name, options) => {
		set({ name, options });
	},
	hideModal: () => {
		set({ name: "hidden" });
	},
}));
