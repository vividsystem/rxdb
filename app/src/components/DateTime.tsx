interface DateTimeProps {
	date: Date | string
}
export function DateTime(props: DateTimeProps) {
	return (<>
		{String(props.date.toISOString().slice(0, 10))}
	</>)
}
