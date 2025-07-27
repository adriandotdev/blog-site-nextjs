CREATE TYPE "public"."visibility" AS ENUM('public', 'private');--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "visibility" "visibility" DEFAULT 'public';