import { signIn } from "next-auth/react";
import { ModeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
export default function Navbar() {
	return (
		<div className="w-full">
			<div className="py-5  flex justify-between items-center max-w-[1148px] mx-auto px-8">
				<div>
					<h1 className="font-bold font-archivo">
						The
						<span className="bg-gradient-to-b from-orange-800  via-red-600  to-orange-400 bg-clip-text text-transparent">
							Daily
						</span>
						Bytes
					</h1>
				</div>
				<div className="flex flex-row gap-3">
					<ModeToggle />
					<Button
						onClick={() => {
							signIn("google");
						}}
						className="hover:cursor-pointer bg-gradient-to-l from-orange-800  via-red-600  to-orange-400 text-white font-bold"
					>
						Try it for free
					</Button>
				</div>
			</div>
		</div>
	);
}
