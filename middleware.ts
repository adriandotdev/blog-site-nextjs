import { auth } from "@/auth";

const publicRoutes = ["/signin"];

export default auth((req) => {
	if (req.auth && publicRoutes.includes(req.nextUrl.pathname)) {
		const newUrl = new URL("/blogs", req.nextUrl.origin);
		return Response.redirect(newUrl);
	}

	if (!req.auth && req.nextUrl.pathname !== "/signin") {
		const newUrl = new URL("/signin", req.nextUrl.origin);
		return Response.redirect(newUrl);
	}
});

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
