import { Skeleton } from "@/components/ui/skeleton";

export default function BlogsSkeleton() {
	return (
		<div className="mt-3">
			<h1 className="text-2xl lg:text-3xl font-bold mt-3">Welcome Blogs</h1>
			<div className="mt-4 flex gap-5">
				<Skeleton className="w-full max-w-md h-[10rem]" />
				<Skeleton className="w-full max-w-md h-[10rem]" />
				<Skeleton className="w-full max-w-md h-[10rem]" />
			</div>
		</div>
	);
}
