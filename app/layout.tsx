import "highlight.js/styles/atom-one-dark.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { EditorProvider } from "@/contexts/useEditor";
import { lora, roboto } from "@/lib/fonts";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
	title: "Blog Site",
	description: "A sample project utilizing NextJS",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${lora.variable} ${roboto.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<SessionProvider>
						<EditorProvider>
							<main className="w-full overflow-y-auto">{children}</main>
							<Toaster />
						</EditorProvider>
					</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
