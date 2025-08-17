import { Button } from "../ui/button";

export default function Footer() {
	return (
		<footer className="bg-slate-900 text-white py-12 ">
			<div className="px-6 md:px-24 max-w-[1348px] mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-10 2xl:gap-1">
					{/* Brand/Logo */}
					<div>
						<h2 className="text-2xl font-bold font-archivo">
							The
							<span className="bg-gradient-to-b from-orange-800  via-red-600  to-orange-400 bg-clip-text text-transparent">
								Daily
							</span>
							Bytes
						</h2>
						<p className="text-sm text-gray-400 mt-2">
							Daily bits of inspiration, information, and everything in between.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-semibold mb-3">Quick Links</h3>
						<ul className="space-y-2 text-sm text-gray-300">
							<li className="hover:underline cursor-pointer">About</li>
							<li className="hover:underline cursor-pointer">Contact</li>
							<li className="hover:underline cursor-pointer">Categories</li>
							<li className="hover:underline cursor-pointer">Privacy Policy</li>
						</ul>
					</div>

					{/* Recent Posts */}
					<div>
						<h3 className="text-lg font-semibold mb-3">Latest Posts</h3>
						<ul className="space-y-2 text-sm text-gray-300">
							<li>Optimizing React Apps</li>
							<li>Git Commands Cheatsheet</li>
							<li>Mastering Async/Await</li>
						</ul>
					</div>

					{/* Newsletter + Socials */}
					<div>
						<h3 className="text-lg font-semibold mb-3">Join Our Community</h3>
						<form
							className="flex flex-col gap-2"
							onSubmit={(e) => e.preventDefault()}
						>
							<input
								type="email"
								placeholder="Your email"
								className="p-2 rounded bg-gray-800 text-white placeholder-gray-400 text-sm"
							/>
							<Button
								type="submit"
								className="hover:cursor-pointer bg-gradient-to-l from-orange-800  via-red-600  to-orange-400 text-white font-bold"
							>
								Subscribe
							</Button>
						</form>
						<div className="flex gap-4 mt-4 text-gray-400">
							<a href="https://twitter.com" target="_blank">
								<i className="fab fa-twitter hover:text-white"></i>
							</a>
							<a href="https://github.com" target="_blank">
								<i className="fab fa-github hover:text-white"></i>
							</a>
							<a href="https://linkedin.com" target="_blank">
								<i className="fab fa-linkedin hover:text-white"></i>
							</a>
						</div>
					</div>
				</div>

				{/* Divider and Copyright */}
				<div className="mt-12 border-t border-gray-700 pt-6 text-sm text-gray-500 text-center">
					© 2025 TheDailyBytes. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
