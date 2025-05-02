interface DateTimeProps {
	date: Date
}
export function DateTime(props: DateTimeProps) {
	return (<>
		{String(props.date.toISOString().slice(0, 10))}
	</>)
}
