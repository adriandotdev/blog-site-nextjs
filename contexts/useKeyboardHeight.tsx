import { useEffect, useState } from "react";

export function useKeyboardOffset() {
	const [keyboardOffset, setKeyboardOffset] = useState(0);

	useEffect(() => {
		const visualViewport = window.visualViewport;

		const onResize = () => {
			const offset =
				window.innerHeight - (visualViewport?.height || window.innerHeight);
			setKeyboardOffset(offset > 0 ? offset : 0);
		};

		visualViewport?.addEventListener("resize", onResize);

		onResize(); // set initial

		return () => {
			visualViewport?.removeEventListener("resize", onResize);
		};
	}, []);

	return keyboardOffset;
}
