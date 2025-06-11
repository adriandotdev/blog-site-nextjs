"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
	error,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="w-full flex justify-center items-center flex-col gap-4  min-h-2/4">
			<h2 className="text-2xl lg:text-3xl font-bold text-center">
				Something went wrong. Please try again later.
			</h2>
			<Link href="/blogs">
				<Button>See your blogs</Button>
			</Link>
		</div>
	);
}
