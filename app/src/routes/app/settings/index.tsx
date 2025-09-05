import { Navigate } from "@solidjs/router";

export default function SettingsIndex() {
  // This runs on the server during SSR and on the client during navigation
	return (<Navigate href="/app/settings/personal"/>)
}
