import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
	return (
		<div className="mt-3">
			<div className=" w-full flex gap-2 justify-end mt-3">
				<Skeleton className="w-full max-w-[6rem] h-[2rem]" />
				<Skeleton className="w-full max-w-[5rem] h-[2rem]" />
				<Skeleton className="w-full max-w-[5rem] h-[2rem]" />
			</div>
		</div>
	);
}
