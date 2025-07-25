import { Button } from "../ui/button";

export default function CTASection() {
	return (
		<div>
			<div className="bg-slate-950 min-h-[26vh] py-24 px-12 lg:px-16">
				<div className="text-center">
					<h2 className="text-4xl font-bold text-slate-100 2xl:text-5xl">
						It’s Time to Share What Matters to You
					</h2>
					<p className="text-slate-300 mt-2 2xl:text-xl">
						Join thousands of writers using TheDailyBytes
					</p>
					<Button className="cursor-pointer mt-6 bg-gradient-to-l from-orange-800 via-red-600 to-orange-400 text-white font-bold">
						Start for Free
					</Button>
				</div>
			</div>
		</div>
	);
}
