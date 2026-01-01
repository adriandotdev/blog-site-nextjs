"use client";

import { Separator } from "@/components/ui/separator";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProfileButton() {
	const session = useSession();

	return (
		<>
			<Separator className="mt-3 mb-2" />
			<DropdownMenu dir="ltr">
				<DropdownMenuTrigger asChild>
					<div className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 p-2 rounded-md dark:hover:bg-slate-800">
						{session.data?.user?.image && (
							<Image
								src={session.data.user.image}
								alt="User Avatar"
								width={32}
								height={32}
								className="rounded-full"
							/>
						)}

						<h1 className="font-bold text-slate-800 dark:text-slate-200">
							{session.data?.user?.name}
						</h1>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem
							onClick={async () => {
								await signOut({ redirectTo: "/" });
							}}
							className="font-bold"
						>
							Logout
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
