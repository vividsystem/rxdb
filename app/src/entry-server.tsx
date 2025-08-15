// @refresh reload
import { StartServer, createHandler } from "@solidjs/start/server";
import { seedPermissions, seedAdmin } from "~/lib/db/seed";

if (process.env.NODE_ENV === "development") {
  seedPermissions()
    .then(() => console.log("Permissions seeded ✅"))
    .catch(console.error);
	seedAdmin()
		.then(() => console.log("✅ Admin seeded with all permissions"))
		.catch(console.error)
}
export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body class="">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
