export const formatChatDate = (dateStr: string): string => {
	if (!dateStr) return ''

	const now = new Date()
	const date = new Date(dateStr)

	const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true }
	const optionsDate = { day: 'numeric', month: 'short', year: 'numeric' }

	const isSameDay = date.toDateString() === now.toDateString()
	const yesterday = new Date(now)
	yesterday.setDate(now.getDate() - 1)
	const isYesterday = date.toDateString() === yesterday.toDateString()

	const timeString = date.toLocaleTimeString([], optionsTime).toUpperCase()

	if (isSameDay) {
		return timeString
	} else if (isYesterday) {
		return 'Yesterday'
	} else {
		return date.toLocaleDateString([], optionsDate)
	}
}

export const formatMessageDate = (timestamp: string) => {
	const now = new Date()
	const date = new Date(timestamp)

	const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true }
	const optionsDate = { day: 'numeric', month: 'short', year: 'numeric' }

	const isSameDay = date.toDateString() === now.toDateString()
	const yesterday = new Date(now)
	yesterday.setDate(now.getDate() - 1)
	const isYesterday = date.toDateString() === yesterday.toDateString()

	const timeString = date.toLocaleTimeString([], optionsTime).toUpperCase()

	let dayString
	if (isSameDay) {
		dayString = 'Today'
	} else if (isYesterday) {
		dayString = 'Yesterday'
	} else {
		dayString = date.toLocaleDateString([], optionsDate)
	}
	return `${timeString}, ${dayString}`
}
