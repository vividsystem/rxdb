import { relations } from "drizzle-orm";
import { integer, timestamp, varchar, boolean, serial, date, uuid, text, pgTable } from "drizzle-orm/pg-core";

import { user } from "./schema-auth";
export const members = pgTable("members", {
  id: uuid("id").primaryKey().defaultRandom(),
	userId: text("user_id").references(() => user.id).unique(),
	
	member_since: timestamp("member_since"),
  firstname: varchar("firstname", { length: 64 }).notNull(),
  lastname: varchar("lastname", { length: 64 }).notNull(),
	dateOfBirth: date("date_of_birth"),
	telephone: varchar("telephone", {length: 22}),
	email: text("email"),
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
	IBAN: varchar("IBAN", { length: 33 }).notNull(),
	BIC: varchar("BIC", { length: 11 }),
})

export const memberRelation = relations(members, ({ one }) => ({
	banking: one(bankingInfo, {
		fields: [members.bankingId],
		references: [bankingInfo.id],
	}),
	user: one(user, {
		fields: [members.userId],
		references: [user.id]
	})
}))
