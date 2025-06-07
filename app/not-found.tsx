import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="w-full h-full flex justify-center items-center flex-col gap-3">
			<h1 className="text-2xl lg:text-3xl font-bold text-slate-950">
				Page Not Found
			</h1>
			<Link href="/blogs">
				<Button>See your blogs</Button>
			</Link>
		</div>
	);
}
