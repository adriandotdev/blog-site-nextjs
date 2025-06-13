import "highlight.js/styles/atom-one-dark.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { EditorProvider } from "@/contexts/useEditor";
import { archivo, geistMono, geistSans } from "@/lib/fonts";
import { SessionProvider } from "next-auth/react";

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
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<SessionProvider>
						<EditorProvider>
							<main className="w-full overflow-y-auto">{children}</main>
						</EditorProvider>
					</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
