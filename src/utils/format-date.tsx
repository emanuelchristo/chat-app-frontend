function parseDate(dateStr: string) {
	const now = new Date()
	const date = new Date(dateStr)

	const isSameDay = date.toDateString() === now.toDateString()
	const yesterday = new Date(now)
	yesterday.setDate(now.getDate() - 1)
	const isYesterday = date.toDateString() === yesterday.toDateString()

	const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase()
	const dateString = date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })

	return { isSameDay, isYesterday, timeString, dateString }
}

export const formatChatDate = (dateStr: string | null): string => {
	if (!dateStr) return ''

	const { isSameDay, isYesterday, timeString, dateString } = parseDate(dateStr)

	if (isSameDay) {
		return timeString
	} else if (isYesterday) {
		return 'Yesterday'
	} else {
		return dateString
	}
}

export const formatMessageDate = (dateStr: string | null) => {
	if (!dateStr) return ''

	const { isSameDay, isYesterday, timeString, dateString } = parseDate(dateStr)

	let dayString
	if (isSameDay) {
		dayString = 'Today'
	} else if (isYesterday) {
		dayString = 'Yesterday'
	} else {
		dayString = dateString
	}
	return `${timeString}, ${dayString}`
}
