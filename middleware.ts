import { auth } from "@/auth";
import { NextResponse } from "next/server";

function isBlogDetailRoute(pathname: string) {
	return /^\/blog\/[^/]+$/.test(pathname);
}

export default auth((req) => {
	const { pathname, origin } = req.nextUrl;

	if (isBlogDetailRoute(pathname)) {
		return NextResponse.next();
	}

	if (req.auth && pathname === "/signin") {
		return NextResponse.redirect(new URL("/blogs", origin));
	}

	if (!req.auth && pathname.startsWith("/blogs")) {
		return NextResponse.redirect(new URL("/signin", origin));
	}
});

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
