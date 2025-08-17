import { create } from "zustand";

type SheetValues = "hidden" | "publish-sheet";

type Payload = {
	id?: number;
	title: string;
	description?: string;
	content: string;
	email: string;
	metadata?: object;
};

type SheetComponentStore = {
	name: SheetValues;
	payload: Payload;
	showSheetComponent: (
		name: "hidden" | "publish-sheet",
		payload: Payload
	) => void;
	hideSheetComponent: () => void;
};

export const useSheetComponentStore = create<SheetComponentStore>((set) => ({
	name: "hidden",
	payload: {
		id: undefined,
		title: "",
		description: "",
		content: "",
		email: "",
		metadata: {},
	},
	showSheetComponent(name, payload) {
		set({ name, payload });
	},
	hideSheetComponent() {
		set({ name: "hidden" });
	},
}));
