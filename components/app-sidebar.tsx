"use client";
import ProfileButton from "@/components/profile-button";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import clsx from "clsx";
import { InfoIcon, Notebook, PencilIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
	{
		title: "My Blogs",
		url: "/blogs",
		icon: Notebook,
	},
	{
		title: "Drafts",
		url: "/blogs/drafts",
		icon: PencilIcon,
	},
	{
		title: "About",
		url: "/blogs/about",
		icon: InfoIcon,
	},
];

export function AppSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="text-sm text-orange-600">
						<span className="text-slate-700 dark:text-slate-200">The</span>Daily
						<span className="text-slate-700 dark:text-slate-200">Bytes</span>
					</SidebarGroupLabel>
					<SidebarGroupContent className="mt-2">
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link
											href={item.url}
											className={clsx(
												pathname === item.url &&
													"bg-slate-900 text-white hover:bg-slate-900 hover:text-white"
											)}
										>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
							<ProfileButton />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
