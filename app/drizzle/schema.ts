import { integer, pgTable, timestamp, varchar, boolean } from "drizzle-orm/pg-core";

export const members = pgTable("members", {
  id: integer("id").primaryKey().unique().notNull(),
	member_since: timestamp("member_since").defaultNow().notNull(),
  firstname: varchar("firstname", { length: 32 }).notNull(),
  lastname: varchar("lastname", { length: 32 }).notNull(),
	email: varchar("email", { length: 320 }).notNull(),
	street: varchar("street", { length: 64 }).notNull(),
	postal: varchar("postal", { length: 5 }).notNull(),
	city: varchar("city", {length: 64 }).notNull(),
	cert: boolean("certificate").notNull().default(false),
	yearOfExchange: varchar("year_of_exchange", { length: 7 }).notNull(),
	exchangeCountry: varchar("exchange_country", { length: 64 }).notNull()
});
