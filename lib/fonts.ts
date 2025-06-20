import {
	Archivo,
	Geist,
	Geist_Mono,
	Lora,
	Montserrat,
	Roboto,
} from "next/font/google";

export const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const archivo = Archivo({
	variable: "--font-archivo",
	subsets: ["latin", "latin-ext"],
	weight: ["400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
});

export const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
});

export const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	style: ["normal", "italic"],
});

export const lora = Lora({
	variable: "--font-lora",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	style: ["normal", "italic"],
});
