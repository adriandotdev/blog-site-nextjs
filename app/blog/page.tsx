import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getBlogs } from "../actions";

export default async function BlogIndex() {
	const blogs = await getBlogs();

	return (
		<div className="max-w-[100vw]">
			<h1 className="text-2xl lg:text-3xl font-bold mt-3">Welcome Blogs</h1>
			<div className="mt-4 flex gap-5">
				{blogs.map((blog) => (
					<Card key={blog.id} className="w-full max-w-md min-h-[8rem]">
						<CardHeader className="flex flex-col">
							<CardTitle>{blog.title}</CardTitle>
							<CardDescription>{blog.content}</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button>Read more {">>"}</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
