import { int, mysqlTable, timestamp, varchar, boolean, year } from "drizzle-orm/mysql-core";

export const Member = mysqlTable("users", {
  id: int("id").primaryKey().unique().notNull(),
	member_since: timestamp("member_since").defaultNow().notNull(),
  firstname: varchar("firstname", { length: 32 }).notNull(),
  lastname: varchar("lastname", { length: 32 }).notNull(),
	email: varchar("email", { length: 320 }).notNull(),
	street: varchar("street", { length: 64 }).notNull(),
	postal: varchar("postal", { length: 5 }).notNull(),
	city: varchar("city", {length: 64 }).notNull(),
	cert: boolean("certificate").notNull().default(false),
	yearOfExchange: year("year_of_exchange").notNull(),
	exchangeCountry: varchar("exchange_country", { length: 64 }).notNull()
});
