import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPageLoading() {
	return (
		<div className="flex justify-center py-[3rem] mt-10">
			<div className="max-w-[640px] w-full ">
				<Skeleton className="h-10 max-w-[250px] w-full" />
				<Skeleton className="h-4 max-w-[450px] w-full mt-[1rem]" />

				<Skeleton className="h-4 max-w-[450px] w-full mt-[3rem]" />
				<Skeleton className="h-4 max-w-[550px] w-full mt-[1rem]" />
				<Skeleton className="h-4 max-w-[450px] w-full mt-[1rem]" />

				<Skeleton className="h-30 max-w-[450px] w-full mt-[3rem]" />

				<Skeleton className="h-4 max-w-[450px] w-full mt-[3rem]" />
				<Skeleton className="h-4 max-w-[550px] w-full mt-[1rem]" />
				<Skeleton className="h-4 max-w-[450px] w-full mt-[1rem]" />
			</div>
		</div>
	);
}
