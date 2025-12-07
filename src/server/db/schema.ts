// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { pgTableCreator, unique } from "drizzle-orm/pg-core";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `fragrance-webapp_${name}`);

export const fragrances = pgTable("fragrances", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  topNotes: text("topNotes"),
  middleNotes: text("middleNotes"),
  baseNotes: text("baseNotes"),
  imageURL: text("imageURL"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  location: text("location"),
});
export const collectionsItems = pgTable("collectionsItems", {
  id: serial("id").primaryKey(),
  fragranceId: integer("fragranceId")
    .notNull()
    .references(() => fragrances.id, { onDelete: "cascade" }),
  collectionsId: integer("collectionsId")
    .notNull()
    .references(() => collections.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const collections = pgTable(
  "collections",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    userId: integer("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    privacy: text("privacy"),
  },
  (table) => ({
    uniqueConstraints: unique("unique").on(table.userId, table.name),
  }),
);

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertList = typeof collectionsItems.$inferInsert;
export type SelectList = typeof collectionsItems.$inferSelect;
