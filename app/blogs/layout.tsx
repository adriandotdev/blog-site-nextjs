import { AppSidebar } from "@/components/app-sidebar";
import EditorToolModal from "@/components/editor-tool-modal";
import DialogModal from "@/components/modals/dialog-modal";
import PublishSheet from "@/components/publish-sheet";
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
				<div key="menu-container" className="flex justify-between w-full px-3">
					<SidebarTrigger />
					<ModeToggle />
				</div>
				{children}
				<EditorToolModal key="editor-tool-modal" />
				<DialogModal key="dialog-modal" />
				<PublishSheet key="publish-sheet" />
			</div>
		</SidebarProvider>
	);
}
