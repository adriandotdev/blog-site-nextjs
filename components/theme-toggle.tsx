"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ModeToggle() {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null; // Avoid hydration mismatch

	return (
		<Button
			className="aspect-square"
			variant="ghost"
			onClick={() => {
				setTheme(theme === "light" ? "dark" : "light");
			}}
		>
			{theme === "light" ? (
				<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
			) : (
				<Moon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
			)}
		</Button>
	);
}
