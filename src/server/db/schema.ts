// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { index, pgTableCreator, unique } from "drizzle-orm/pg-core";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `fragrance-webapp_${name}`);

export const fragrances = pgTable(
  "fragrances",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    notes: text("notes").default("No Notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (table) => {
    return {
      nameIdx: index("name_idx").on(table.name),
    };
  },
);
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});
export const userLists = pgTable(
  "userLists",
  {
    id: serial("id").primaryKey(),
    type: text("type").notNull(),
    fragranceId: integer("fragranceId").notNull(),
    notes: text("notes"),
    userId: integer("userId")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt")
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    uniqueConstraints: [
      unique("user_fragrance_type_unique").on(
        table.userId,
        table.fragranceId,
        table.type,
      ),
    ],
  }),
);

export const collections = pgTable("collection", {
  id: serial("id").primaryKey(),
  collectionDescription: text("collectionDescription"),
  collectionName: text("collectionName").notNull(),
  collectionPrivacy: text("collectionPrivacy").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const collectionItems = pgTable("collectionItems", {
  id: serial("id").primaryKey(),
  collectionId: integer("collectionId")
    .notNull()
    .references(() => collections.id, { onDelete: "cascade" }),
  fragranceId: integer("fragranceId")
    .notNull()
    .references(() => fragrances.id, { onDelete: "cascade" }),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertList = typeof userLists.$inferInsert;
export type SelectList = typeof userLists.$inferSelect;

export type InsertCollection = typeof collections.$inferInsert;
export type SelectCollection = typeof collections.$inferSelect;

export type InsertCollectionItem = typeof collectionItems.$inferInsert;
export type SelectCollectionItem = typeof collectionItems.$inferSelect;
