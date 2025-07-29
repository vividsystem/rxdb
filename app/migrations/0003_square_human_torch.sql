CREATE TABLE "account" (
	"userId" uuid NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE "authenticator" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "members" DROP CONSTRAINT "members_id_unique";--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "id" SET DATA TYPE UUID; -- USING (uuid_generate_v4())
ALTER TABLE "members" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "email" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "emailVerified" timestamp;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_members_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_members_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_members_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_email_unique" UNIQUE("email");
