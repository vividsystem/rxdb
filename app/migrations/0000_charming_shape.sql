CREATE TABLE IF NOT EXISTS "banking_information" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstname" varchar(64),
	"lastname" varchar(64),
	"IBAN" varchar(33),
	"BIC" varchar(11),
	CONSTRAINT "banking_information_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "members" (
	"id" serial PRIMARY KEY NOT NULL,
	"member_since" timestamp,
	"firstname" varchar(64) NOT NULL,
	"lastname" varchar(64) NOT NULL,
	"telephone" varchar(22),
	"email" varchar(320),
	"street" varchar(64),
	"postal" varchar(5),
	"city" varchar(64),
	"certificate" boolean DEFAULT false NOT NULL,
	"year_of_exchange" varchar(9),
	"exchange_country" varchar(64),
	"banking_id" integer,
	CONSTRAINT "members_id_unique" UNIQUE("id")
);
--> statement-breakpoint
--ALTER TABLE "members" ADD CONSTRAINT "members_banking_id_banking_information_id_fk" FOREIGN KEY ("banking_id") REFERENCES "public"."banking_information"("id") ON DELETE no action ON UPDATE no action;
