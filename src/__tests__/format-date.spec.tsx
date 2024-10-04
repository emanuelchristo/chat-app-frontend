import { formatChatDate, formatMessageDate } from '../utils/format-date'

describe('Date format functions', () => {
	it('should return empty string on falsy date arg', () => {
		expect(formatChatDate(null)).toBe('')
		expect(formatMessageDate(null)).toBe('')
	})

	it('should return "Yesterday" when given yesterdays date', () => {
		const yesterday = new Date()
		yesterday.setDate(yesterday.getDate() - 1)
		const yesterdayStr = yesterday.toJSON()

		expect(formatChatDate(yesterdayStr)).toBe('Yesterday')
		expect(formatMessageDate(yesterdayStr)).toMatch('Yesterday')
	})
})
