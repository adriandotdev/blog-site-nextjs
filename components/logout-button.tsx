"use client";

import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import Image from "next/image";
export default function LogoutButton() {
	const session = useSession();

	return (
		<>
			<Separator className="mt-3 mb-2" />
			<div className="flex items-center gap-2">
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
					{session.data?.user?.email}
				</h1>
			</div>
		</>
	);
}
