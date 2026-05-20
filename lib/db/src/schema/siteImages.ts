import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const siteImagesTable = pgTable("site_images", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  url: text("url").notNull(),
  label: text("label").notNull().default("general"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SiteImageRow = typeof siteImagesTable.$inferSelect;
