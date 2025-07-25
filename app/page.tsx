"use client";

import CTASection from "@/components/home/cta-section";
import FrequentlyAskedQuestionsSection from "@/components/home/faqs-section";
import FeaturesSection from "@/components/home/features-section";
import HeroSection from "@/components/home/hero-section";
import Navbar from "@/components/home/navbar";
import TestimonialsSection from "@/components/home/testimonials-section";

export default function Home() {
	return (
		<div>
			<Navbar />
			<HeroSection />
			<FeaturesSection />
			<TestimonialsSection />
			<FrequentlyAskedQuestionsSection />
			<CTASection />
		</div>
	);
}
