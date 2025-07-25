"use client";
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import company from "../../public/images/testimonials/company.jpg";
import user1 from "../../public/images/testimonials/user1.jpg";
import user2 from "../../public/images/testimonials/user2.jpg";
import user3 from "../../public/images/testimonials/user3.jpg";

type ReviewerProps = {
	partnerLogoURL: string;
	clientLogoURL: string;
	partner: string;
	client: string;
};

const Indicator = ({ selected }: { selected: boolean }) => (
	<motion.div
		className={`flex items-center rounded-full ${
			selected
				? "h-[16px] w-[16px] bg-gradient-to-b from-orange-800  via-red-600  to-orange-400"
				: "h-[16px] w-[16px] border-white bg-gradient-to-b from-orange-800  via-red-600  to-orange-400"
		}`}
		animate={{
			height: selected ? "16px" : "8px",
			width: selected ? "16px" : "8px",
		}}
		transition={{ type: "spring" }}
	></motion.div>
);

const Reviewer = (props: ReviewerProps) => {
	return (
		<div className="flex items-center">
			<div className="flex flex-row items-center gap-[4px]">
				<div className="relative h-[48px] w-[48px] rounded-full">
					<Image
						src={props.partnerLogoURL}
						alt=""
						width={48}
						height={48}
						className="aspect-square rounded-full"
					/>
				</div>
				<div className="relative left-[-20px] h-[48px] w-[48px] rounded-full border border-[#062F1E]">
					<Image
						src={props.clientLogoURL}
						alt=""
						width={48}
						height={48}
						className="aspect-square h-full w-full rounded-full object-cover"
					/>
				</div>
			</div>
			<div className="flex flex-col gap-1">
				<p className="font-archivo-expanded text-[12px] md:text-[16px] lg:text-[20px] font-bold uppercase leading-normal text-black">
					{props.partner}
				</p>
				<p className="font-archivo text-[12px] font-normal leading-normal text-slate-900">
					{props.client}
				</p>
			</div>
		</div>
	);
};

export default function TestimonialsSection() {
	const plugin = React.useRef(
		Autoplay({ delay: 1500, stopOnInteraction: true })
	);
	const [api, setApi] = React.useState<CarouselApi>();
	const [currentIndex, setCurrentIndex] = React.useState(0);

	React.useEffect(() => {
		if (!api) {
			return;
		}

		setCurrentIndex(api.selectedScrollSnap());

		api.on("select", () => {
			setCurrentIndex(api.selectedScrollSnap());
		});
	}, [api]);

	// @TODO: Should be put in a separate file or constant file.
	const dummyReviews = [
		{
			partnerLogoURL: user1,
			clientLogoURL: company,
			partner: "Ella Ramirez – Full Stack Developer",
			client: "TechVerse Inc.",
			review:
				"Using this platform has made publishing technical blogs a breeze. The clean editor and shareable links make it perfect for developers like me.",
		},
		{
			partnerLogoURL: user2,
			clientLogoURL: company,
			partner: "Jade Moreno – Social Media Organizer",
			client: "Inspirely Media",
			review:
				"I love how easily I can draft and post campaign updates. It's fast, intuitive, and my followers love the blog layout!",
		},
		{
			partnerLogoURL: user3,
			clientLogoURL: company,
			partner: "Dr. Adrian Cruz – Pediatrician",
			client: "Nova Health Solutions",
			review:
				"This platform helps me share medical tips and updates with my patients. It's secure, responsive, and very user-friendly.",
		},
	];

	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] gap-5 2xl:gap-10 overflow-hidden px-4 py-12">
			<div>
				<h1 className="flex flex-col md:flex-row gap-2 font-bold  text-4xl font-archivo lg:text-5xl h-[6rem] md:h-[4rem] bg-gradient-to-b from-orange-800  via-red-600  to-orange-400 bg-clip-text text-transparent text-center text-wrap break-words 2xl:text-6xl">
					<span>Why They Love</span>
					<span>Our Platform</span>
				</h1>
			</div>
			<div className="relative w-full max-w-[1182px]">
				<div
					className={cn(
						"absolute top-[-150px] z-10 hidden h-[620px] w-[302px] bg-white dark:bg-[oklch(0.145_0_0)] blur-[50px] lg:block",
						currentIndex === 0 ? "left-[-280px]" : "left-[-150px]"
					)}
				></div>
				<div
					className={cn(
						"absolute top-[-150px] z-10 hidden h-[620px] w-[302px] bg-white dark:bg-[oklch(0.145_0_0)] blur-[50px] lg:block",
						currentIndex === dummyReviews.length - 1
							? "right-[-280px]"
							: "right-[-150px]"
					)}
				></div>
				<Carousel
					plugins={[plugin.current]}
					onMouseEnter={plugin.current.stop}
					onMouseLeave={plugin.current.reset}
					className="w-full rounded-lg"
					setApi={setApi}
				>
					<CarouselContent>
						{dummyReviews.map((review, index) => (
							<CarouselItem
								key={index}
								className="max-w-[750px] w-full min-h-[300px]"
							>
								<div className="p-1">
									<div className="max-w-[740px] w-full rounded-[16px] bg-gradient-to-b  from-orange-50  via-red-200  to-orange-800 p-[1.5px] md:min-h-[304px]">
										<div className="flex min-h-[340px] w-full select-none flex-col items-start justify-between gap-[40px] rounded-[16px] border bg-white p-[40px] backdrop-blur-0">
											<p className="flex max-w-[660px] items-center font-archivo text-[16px] font-medium leading-[22.4px] text-black md:text-[24px] md:font-medium md:leading-[33.6px]">
												{review.review}
											</p>
											<Reviewer {...(review as unknown as ReviewerProps)} />
										</div>
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<div className="flex flex-row items-center justify-center gap-4 md:-ml-8 mt-5">
						{dummyReviews.map((_, index) => (
							<Indicator key={index} selected={index === currentIndex} />
						))}
					</div>
				</Carousel>
			</div>
		</div>
	);
}
