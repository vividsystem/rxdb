import { relations } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar, boolean, serial, date } from "drizzle-orm/pg-core";

export const members = pgTable("members", {
  id: serial("id").primaryKey().unique().notNull(),
	member_since: timestamp("member_since"),
  firstname: varchar("firstname", { length: 64 }).notNull(),
  lastname: varchar("lastname", { length: 64 }).notNull(),
	dateOfBirth: date("date_of_birth"),
	telephone: varchar("telephone", {length: 22}),
	email: varchar("email", { length: 320 }),
	street: varchar("street", { length: 64 }),
	postal: varchar("postal", { length: 5 }),
	city: varchar("city", { length: 64 }),
	cert: boolean("certificate").default(false).notNull(),
	yearOfExchange: varchar("year_of_exchange", { length: 9 }),
	exchangeCountry: varchar("exchange_country", { length: 64 }),
	bankingId: integer("banking_id").notNull().references(() => bankingInfo.id)
});


export const bankingInfo = pgTable("banking_information", {
	id: serial("id").primaryKey().unique().notNull(),
	firstname: varchar("firstname", { length: 64 }),
	lastname: varchar("lastname", { length: 64}),
	IBAN: varchar("IBAN", { length: 33 }),
	BIC: varchar("BIC", { length: 11 }),

})

export const memberRelation = relations(members, ({ one }) => ({
	banking: one(bankingInfo, {
		fields: [members.bankingId],
		references: [bankingInfo.id],
	})
}))
