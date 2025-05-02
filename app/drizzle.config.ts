export default {
  dialect: "postgresql",
	out: "./migrations",
  schema: "./drizzle/schema.ts",
	dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};
