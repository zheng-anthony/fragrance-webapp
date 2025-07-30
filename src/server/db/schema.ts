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
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});
export const userlistsTable = pgTable("userLists", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  fragranceId: integer("fragranceId").notNull(),
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
export const collectionsTable = pgTable("collection", {
  id: serial("id").primaryKey(),
  collections_name: text("collection_name").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const collectionItemsTable = pgTable("collectionItems", {
  id: serial("id").primaryKey(),
  collection_id: integer("collection_id")
    .notNull()
    .references(() => collectionsTable.id, { onDelete: "cascade" }),
  fragrance_id: integer("fragrance_id")
    .notNull()
    .references(() => fragrances.id, { onDelete: "cascade" }),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertList = typeof userlistsTable.$inferInsert;
export type SelectList = typeof userlistsTable.$inferSelect;

export type InsertCollection = typeof collectionsTable.$inferInsert;
export type SelectCollection = typeof collectionsTable.$inferSelect;

export type InsertCollectionItem = typeof collectionItemsTable.$inferInsert;
export type SelectCollectionItem = typeof collectionItemsTable.$inferSelect;
