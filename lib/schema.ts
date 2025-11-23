import { pgTable, uuid, varchar, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    role: varchar('role', { length: 50 }).default('admin'),
    createdAt: timestamp('created_at').defaultNow(),
});

export const favorites = pgTable('favorites', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
    projectSlug: varchar('project_slug', { length: 255 }).notNull(),
    sanityPhotoId: varchar('sanity_photo_id', { length: 255 }).notNull(),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow(),
});
