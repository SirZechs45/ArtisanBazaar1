import { pgTable, varchar, integer, boolean, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Notification types
export const notificationType = ['order_update', 'system', 'message'] as const;

// Notifications table
export const notifications = pgTable("notifications", {
  id: integer("id").primaryKey().notNull(),
  userId: integer("user_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  type: varchar("type", { length: 50 }).notNull().$type<typeof notificationType[number]>(),
  isRead: boolean("is_read").default(false).notNull(),
  data: jsonb("data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schema
export const insertNotificationSchema = createInsertSchema(notifications).omit({ id: true, createdAt: true });

// Types
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;