export default function FeaturesSection() {
	return (
		<div className="bg-slate-950 min-h-[56vh] py-24 px-12 lg:px-16 flex flex-col justify-center items-center">
			<div>
				<h1 className="font-archivo font-bold text-4xl lg:text-5xl text-center bg-gradient-to-r from-orange-600 via-red-500 to-orange-400 bg-clip-text text-transparent text-wrap break-words min-h-[4rem]">
					All-in-One Platform to Write and Share Instantly
				</h1>
				<div className="flex flex-col items-center lg:flex-row gap-8 mt-16 w-full">
					<div className="flex flex-col gap-12 lg:gap-8 lg:flex-row">
						{/* @TODO: Must be put to another component */}
						<div className="max-w-[350px] flex flex-col gap-5">
							<h2 className="text-slate-50 text-2xl font-medium">
								✍️ Effortless Writing
							</h2>
							<p className="text-slate-300">
								Our clean, distraction-free editor makes it easy to focus on
								your words — whether you are writing tutorials, stories, or
								updates.
							</p>
						</div>

						<div className="max-w-[350px] flex flex-col gap-5">
							<h2 className="text-slate-50 text-2xl font-medium">
								🔗 Share Instantly
							</h2>
							<p className="text-slate-300">
								Every blog gets a unique shareable link, so you can post it on
								social media, send it to friends, or embed it anywhere.
							</p>
						</div>

						<div className="max-w-[350px] flex flex-col gap-5">
							<h2 className="text-slate-50 text-2xl font-medium">
								📱 Mobile-Friendly by Default
							</h2>
							<p className="text-slate-300">
								Your blog looks great on any device, with responsive design
								built in — no extra setup needed.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
