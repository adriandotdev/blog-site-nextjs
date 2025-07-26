import { AppSidebar } from "@/components/app-sidebar";
import EditorToolModal from "@/components/editor-tool-modal";
import { ModeToggle } from "@/components/theme-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function BlogLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="w-full px-3 pt-3 dark:bg-slate-950">
				<div className="flex justify-between w-full px-3">
					<SidebarTrigger />
					<ModeToggle />
				</div>
				{children}
				<EditorToolModal />
			</div>
		</SidebarProvider>
	);
}
