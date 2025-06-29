import { create } from "zustand";

type ModalValues = "hidden" | "modal";

type ModalStore = {
	name: ModalValues;
	showModal: (name: "hidden" | "modal") => void;
	hideModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
	name: "hidden",
	showModal: (name) => {
		set({ name });
	},
	hideModal: () => {
		set({ name: "hidden" });
	},
}));
