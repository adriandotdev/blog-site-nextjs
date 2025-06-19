import { useEffect, useState } from "react";

export function useKeyboardOffset() {
	const [keyboardOffset, setKeyboardOffset] = useState(0);

	useEffect(() => {
		const visualViewport = window.visualViewport;

		const onResize = () => {
			if (!visualViewport) return;

			const offsetTop = visualViewport.offsetTop || 0;
			const heightDiff = window.innerHeight - visualViewport.height;

			// When the keyboard is visible, heightDiff will be > 0
			// Offset must include how much the layout shifted upward (offsetTop)
			const offset = heightDiff + offsetTop;

			setKeyboardOffset(offset > 0 ? offset : 0);
		};

		visualViewport?.addEventListener("resize", onResize);
		visualViewport?.addEventListener("scroll", onResize); // required for offsetTop updates

		onResize(); // initial call

		return () => {
			visualViewport?.removeEventListener("resize", onResize);
			visualViewport?.removeEventListener("scroll", onResize);
		};
	}, []);

	return keyboardOffset;
}
