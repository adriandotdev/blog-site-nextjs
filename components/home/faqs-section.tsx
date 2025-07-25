import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function FrequentlyAskedQuestionsSection() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[65vh] gap-5 2xl:gap-10 overflow-hidden px-8 py-12 ">
			<div>
				<h1 className="flex flex-col md:flex-row gap-2 font-bold  text-4xl font-archivo lg:text-5xl min-h-[4rem] bg-gradient-to-b from-orange-800  via-red-600  to-orange-400 bg-clip-text text-transparent text-center text-wrap break-words 2xl:text-6xl">
					<span>Frequently Asked Questions</span>
				</h1>
			</div>
			<Accordion type="single" collapsible className=" max-w-[730px] w-full">
				<AccordionItem value="item-1">
					<AccordionTrigger className="font-bold text-xl">
						Is it free to use?
					</AccordionTrigger>
					<AccordionContent className="text-md">
						Yes — our platform is completely free to use. You can write,
						publish, and share your blogs without any cost.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger className="font-bold text-xl">
						Do I need any technical or coding skills?
					</AccordionTrigger>
					<AccordionContent className="text-md">
						Not at all. Our platform is designed to be beginner-friendly. If you
						can type, you can blog.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger className="font-bold text-xl">
						How do I share my blog posts?
					</AccordionTrigger>
					<AccordionContent className="text-md">
						Each blog comes with a unique public link you can share on social
						media, messaging apps, or anywhere online.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-4">
					<AccordionTrigger className="font-bold text-xl">
						Who can see my blogs?
					</AccordionTrigger>
					<AccordionContent className="text-md">
						By default, your blogs are public via the share link. We are working
						on adding privacy controls for private or unlisted posts soon.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
