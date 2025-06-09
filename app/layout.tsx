import "highlight.js/styles/github.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

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
						<main className="w-full overflow-y-auto">{children}</main>
					</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
