export default {
  dialect: "postgresql",
	out: "./migrations",
  schema: "./drizzle/",
	dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};
