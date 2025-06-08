import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="w-full flex justify-center items-center flex-col gap-3  min-h-[100vh] ">
			<div className="flex justify-center items-center flex-col gap-3 my-auto">
				<h1 className="text-2xl lg:text-3xl font-bold text-slate-950 dark:text-slate-200 text-center">
					404 - We could not find that page
				</h1>
				<p className="text-center">
					The link may be broken or the page may have been removed.
				</p>
				<Link href="/blogs">
					<Button>See your blogs</Button>
				</Link>
			</div>
		</div>
	);
}
