"use client";

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
import { Home, InfoIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
	{
		title: "My Blogs",
		url: "/blogs",
		icon: Home,
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
					<SidebarGroupLabel>Welcome to Blog Site</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a
											href={item.url}
											className={clsx(
												pathname === item.url &&
													"bg-slate-900 text-white hover:bg-slate-900 hover:text-white"
											)}
										>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
