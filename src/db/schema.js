import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const matchStatusEnum = pgEnum('match_status', ['scheduled', 'live', 'finished']);

export const matches = pgTable('matches', {
  id: serial('id').primaryKey(),
  sport: varchar('sport', { length: 100 }).notNull(),
  homeTeam: varchar('home_team', { length: 150 }).notNull(),
  awayTeam: varchar('away_team', { length: 150 }).notNull(),
  status: matchStatusEnum('status').notNull().default('scheduled'),
  startTime: timestamp('start_time', { withTimezone: true }).notNull(),
  endTime: timestamp('end_time', { withTimezone: true }),
  homeScore: integer('home_score').notNull().default(0),
  awayScore: integer('away_score').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const commentary = pgTable('commentary', {
  id: serial('id').primaryKey(),
  matchId: integer('match_id')
    .notNull()
    .references(() => matches.id, { onDelete: 'cascade' }),
  minute: integer('minute').notNull(),
  sequence: integer('sequence').notNull(),
  period: varchar('period', { length: 50 }),
  eventType: varchar('event_type', { length: 100 }).notNull(),
  actor: varchar('actor', { length: 150 }),
  team: varchar('team', { length: 150 }),
  message: text('message').notNull(),
  metadata: jsonb('metadata').$type({}),
  tags: text('tags').array(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const demoUsers = pgTable('demo_users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

