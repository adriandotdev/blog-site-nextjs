import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="w-full flex justify-center items-center flex-col gap-3  min-h-2/4">
			<div className="flex justify-center items-center flex-col gap-3 my-auto">
				<h1 className="text-2xl lg:text-3xl font-bold text-slate-950 dark:text-slate-200">
					Oops! This blog post does not exist.
				</h1>
				<p>It might have been removed, renamed, or never existed.</p>
				<Link href="/blogs">
					<Button>See your blogs</Button>
				</Link>
			</div>
		</div>
	);
}
