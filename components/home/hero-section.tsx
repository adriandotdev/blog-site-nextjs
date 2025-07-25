import { Button } from "../ui/button";

export default function HeroSection() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] gap-5">
			<h1 className="font-bold bg-gradient-to-r from-orange-600 via-red-500 to-orange-400 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-archivo leading-tight text-wrap break-words text-center px-8">
				Share Your Voice With the World
			</h1>

			<div className="flex font-semibold text-lg items-center gap-2 font-lora text-slate-800 lg:text-3xl dark:text-slate-100">
				<span>Simple.</span>
				<span>Free.</span>
				<span>Instant.</span>
			</div>
			<div className="flex gap-4 mt-2 flex-wrap justify-center">
				<Button
					size="lg"
					className="bg-white text-slate-950 font-semibold border-[0.5px] hover:bg-white hover:border hover:cursor-pointer"
				>
					Start Writing
				</Button>

				<Button
					size="lg"
					className="hover:cursor-pointer dark:bg-gradient-to-r from-orange-600 via-red-500 to-orange-400 dark:text-slate-50 font-semibold"
				>
					Explore Blogs
				</Button>
			</div>
		</div>
	);
}
