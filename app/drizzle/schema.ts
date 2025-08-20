import { relations } from "drizzle-orm";
import { integer, varchar, boolean, serial, date, uuid, text, pgTable } from "drizzle-orm/pg-core";

import { user } from "./schema-auth";
export const members = pgTable("members", {
  id: uuid("id").primaryKey().defaultRandom(),
	userId: text("user_id").references(() => user.id).unique(),
	verified: boolean("verified").default(false).notNull(),	
	memberSince: date("member_since"), 
	firstname: varchar("firstname", { length: 64 }).notNull(),
  lastname: varchar("lastname", { length: 64 }).notNull(),
	dateOfBirth: date("date_of_birth"),
	telephone: varchar("telephone", {length: 22}),
	email: text("email").unique(),
	street: varchar("street", { length: 64 }),
	postal: varchar("postal", { length: 5 }),
	city: varchar("city", { length: 64 }),
	cert: boolean("certificate").default(false).notNull(),
	yearOfExchange: varchar("year_of_exchange", { length: 9 }),
	exchangeCountry: varchar("exchange_country", { length: 64 }),
});


export const bankingInfo = pgTable("banking_information", {
	id: serial("id").primaryKey().unique().notNull(),
	firstname: varchar("firstname", { length: 64 }),
	lastname: varchar("lastname", { length: 64}),
	IBAN: varchar("IBAN", { length: 33 }).notNull(),
	BIC: varchar("BIC", { length: 11 }),
	memberId: uuid("member_id").references(() => members.id, {onDelete: 'cascade'}).unique()
})

export const memberRelation = relations(members, ({ one }) => ({
	user: one(user, {
		fields: [members.userId],
		references: [user.id]
	})
}))

// role-based auth
export const roles = pgTable("roles", {
	id: serial("id").primaryKey().unique().notNull(),
	name: varchar("name").unique().notNull(),
})

export const permissions = pgTable("permissions", {
	id: serial("id").primaryKey().unique().notNull(),
	name: varchar("name").unique().notNull(),
})

export const memberRoles = pgTable("member_roles", {
	memberId: uuid("member_id").references(() => members.id).notNull(),
	roleId: serial("role_id").references(() => roles.id).notNull()
})

export const rolePermissions = pgTable("role_permissions", {
	roleId: serial("role_id").references(() => roles.id).notNull(),
	permissionId: serial("permission_id").references(() => permissions.id).notNull()
})
