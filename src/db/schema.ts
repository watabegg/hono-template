import {
	pgTable,
	text,
	timestamp,
	foreignKey
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm/relations'
import { sql } from 'drizzle-orm'
	
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
});

export const articles = pgTable("articles", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull(),
	title: text("title").notNull(),
	content: text("content").notNull(),
	createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
},
	(table) => [
		foreignKey({
			name: "articles_user_id_fkey",
			columns: [table.userId],
			foreignColumns: [users.id],
		}),
	]
);

export const articleRelations = relations(articles, ({ one }) => ({
	user: one(users, {
		fields: [articles.userId],
		references: [users.id],
	}),
}));
