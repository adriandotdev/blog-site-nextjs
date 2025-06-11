ALTER TABLE "blogs" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "status" text DEFAULT 'published' NOT NULL;