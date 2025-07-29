// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `fragrance-webapp_${name}`);

export const fragrances = createTable(
  "fragrance",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }).notNull(),
    url: d.varchar({ length: 1024 }).notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)],
);
export const usersTable = pgTable("usersTable", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});
export const wishlistTable = pgTable("wishlistTable", {
  id: serial("id").primaryKey(),
  fragrance_name: text("fragrance_name").notNull(),
  notes: text("notes").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});
export const triedTable = pgTable("triedTable", {
  id: serial("id").primaryKey(),
  fragrance_name: text("fragrance_name").notNull(),
  notes: text("notes").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});
export const ownedTable = pgTable("ownedTable", {
  id: serial("id").primaryKey(),
  fragrance_name: text("fragrance_name").notNull(),
  notes: text("notes").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});
export const collectionsTable = pgTable("collectionsTable", {
  id: serial("id").primaryKey(),
  collections_name: text("collection_name").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
export type InsertList = typeof wishlistTable.$inferInsert;
export type SelectList = typeof wishlistTable.$inferSelect;
export type InsertTried = typeof triedTable.$inferInsert;
export type SelectTried = typeof triedTable.$inferSelect;
export type InsertOwned = typeof ownedTable.$inferInsert;
export type SelectOwned = typeof ownedTable.$inferSelect;
