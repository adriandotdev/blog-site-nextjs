import { useRouter } from "next/navigation";
import { ModeToggle } from "../theme-toggle";
import { Button } from "../ui/button";

export default function Navbar() {
	const router = useRouter();

	return (
		<div className="p-5 border-b flex justify-between lg:px-24 px-8 items-center">
			<div>
				<h1>TheDailyBytes</h1>
			</div>
			<div className="flex flex-row gap-3">
				<Button
					onClick={() => {
						router.push("/signin");
					}}
					className="hover:cursor-pointer bg-gradient-to-l from-orange-800  via-red-600  to-orange-400 text-white font-bold"
				>
					Try it for free
				</Button>
				<ModeToggle />
			</div>
		</div>
	);
}
