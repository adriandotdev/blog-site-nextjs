import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { archivo } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import googleIcon from "../../public/google-icon.png";

type Params = Promise<{ callbackUrl: string }>;

export default async function SignInPage({ params }: { params: Params }) {
	return (
		<div className="w-full min-h-[100vh] flex justify-center items-center flex-col gap-5">
			<h1
				className={cn(
					"font-bold text-2xl lg:text-3xl font-arc",
					archivo.className
				)}
			>
				Welcome to Blog Site
			</h1>
			<div className="gap-5 flex flex-col">
				<Button
					onClick={async () => {
						"use server";

						await signIn("google", {
							redirectTo: (await params).callbackUrl ?? "/blogs",
						});
					}}
				>
					<Image src={googleIcon} width={24} height={24} alt="" />
					Login with Google
				</Button>
			</div>
		</div>
	);
}
